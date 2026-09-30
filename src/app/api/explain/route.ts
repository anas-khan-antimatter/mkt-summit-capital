// Route: /api/explain
// Provides plain-English explanation of a strategy.
// If OPENAI_API_KEY env variable is set, calls GPT-4o-mini for a rich explanation.
// Otherwise returns a high-quality deterministic fallback.

import { NextRequest, NextResponse } from "next/server";

const STRATEGY_EXPLANATIONS: Record<string, { short: string; detailed: string }> = {
  "global-equities": {
    short: "Investing in a concentrated portfolio of high-quality companies across developed and select emerging markets.",
    detailed:
      "Global equity investing at Summit Capital means owning 20–30 of the world's best businesses. We focus on companies with strong competitive advantages, sustainable free cash flow, and management teams that think like owners. Rather than tracking an index, we concentrate capital where our research gives us the highest conviction. This approach typically reduces exposure to the weakest companies in an index while increasing allocation to the strongest — a strategy that has historically compounded at attractive rates over full market cycles.",
  },
  "fixed-income": {
    short: "Building a ladder of investment-grade bonds and credit instruments matched to your liquidity needs.",
    detailed:
      "Our fixed-income approach prioritises capital preservation and income consistency. We construct bond ladders using primarily investment-grade corporate and government securities, staggering maturities to provide predictable cash flows while managing interest rate risk. Duration is actively managed based on our macro outlook: we shorten duration when we expect rates to rise, and extend when we expect rates to fall. For qualified clients, we may also selectively include private credit, high-yield, or emerging-market debt where the risk premium adequately compensates for the additional risk.",
  },
  "private-placements": {
    short: "Direct co-investment and select fund access in private companies, real assets, and special situations.",
    detailed:
      "Private placements offer qualified clients access to investment opportunities not available in public markets. These include direct co-investments alongside experienced sponsors, venture and growth equity funds, and real asset partnerships in infrastructure, timber, and real estate. The hallmark of this strategy is a rigorous due diligence process: we evaluate each opportunity on its standalone merit rather than allocating to a blind pool. Illiquidity premiums can enhance returns, but clients must have a long-term horizon and the ability to hold these positions through market cycles without requiring liquidity.",
  },
  "estate-planning": {
    short: "Structuring your wealth for tax-efficient transfer across generations using trusts and gifting strategies.",
    detailed:
      "Estate planning at Summit Capital is about ensuring that the wealth you have built serves your family for generations. We work with your legal and tax advisors to design trust structures that minimise estate taxes, protect assets from creditors, and provide for beneficiaries in a controlled manner. Common tools include spousal lifetime access trusts (SLATs), grantor retained annuity trusts (GRATs), charitable remainder trusts, and dynasty trusts. We also help implement annual gifting programmes and generation-skipping transfer strategies to maximise the wealth that passes to future generations.",
  },
  "tax-aware": {
    short: "Minimising after-tax drag through strategic asset location, tax-loss harvesting, and municipal bond allocation.",
    detailed:
      "Tax-aware investing recognises that what matters is not what you earn, but what you keep. We implement tax-loss harvesting systematically — realising losses to offset gains and reduce current tax liability. Asset location is equally important: we place tax-inefficient investments (bonds, REITs, high-turnover strategies) in tax-deferred accounts, and tax-efficient investments (buy-and-hold equities, municipal bonds) in taxable accounts. For clients in high tax brackets, we use municipal bonds to generate tax-free income and may employ charitable remainder trusts for concentrated stock positions.",
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const strategy = searchParams.get("strategy")?.toLowerCase().replace(/\s+/g, "-") || "";

  // Generic fallback for unknown strategies
  const defaultExplanation = {
    short: "A custom investment strategy designed around your specific objectives, risk tolerance, and time horizon.",
    detailed:
      "At Summit Capital, every strategy is bespoke. We begin with a thorough discovery process to understand your liquidity needs, risk tolerance, family dynamics, and long-term objectives. From there, we construct a portfolio that combines public market securities, alternative investments, and tax-aware structures to meet your specific goals. The strategy is documented in an Investment Policy Statement and reviewed quarterly with your principal advisor. Adjustments are made as your circumstances evolve, ensuring the strategy remains aligned with your objectives through changing market conditions and life events.",
  };

  const explanation =
    STRATEGY_EXPLANATIONS[strategy] || defaultExplanation;
  const label = strategy
    ? strategy
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Custom strategy";

  // Try to use AI if key exists
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey && apiKey.length > 10) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a private wealth advisor explaining investment strategies to high-net-worth clients. Use clear, plain English. Be specific and insightful. Maximum 150 words.",
            },
            {
              role: "user",
              content: `Explain the investment strategy "${label}" to a client in plain English. Include why it might be suitable and what risks to consider.`,
            },
          ],
          max_tokens: 300,
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiText = data?.choices?.[0]?.message?.content;
        if (aiText) {
          return NextResponse.json({
            strategy: label,
            explanation: aiText,
            source: "ai",
          });
        }
      }
    } catch {
      // Fall through to deterministic response
    }
  }

  return NextResponse.json({
    strategy: label,
    explanation: explanation.detailed,
    short: explanation.short,
    source: "deterministic",
  });
}