// Route: /api/allocate
// Takes equity/credit/private allocation percentages and returns risk score + commentary.
// If OPENAI_API_KEY exists, enriches with AI-generated commentary; otherwise deterministic.

import { NextRequest, NextResponse } from "next/server";

interface AllocateRequest {
  equity: number;
  credit: number;
  privateAlt: number;
}

interface AllocateResponse {
  equity: number;
  credit: number;
  privateAlt: number;
  cash: number;
  riskScore: number;
  riskLabel: string;
  commentary: string;
  source: "ai" | "deterministic";
}

function computeRiskScore(e: number, c: number, p: number): number {
  // Equity weight drives risk; alternatives add moderate risk; credit reduces risk
  const raw = (e * 0.65 + p * 0.35 + c * 0.1) / 100;
  return Math.round(raw * 10 * 10) / 10; // 0-10 scale
}

function getRiskLabel(score: number): string {
  if (score < 2) return "Capital Preservation";
  if (score < 3.5) return "Conservative";
  if (score < 5) return "Moderate";
  if (score < 7) return "Balanced Growth";
  if (score < 8.5) return "Growth";
  return "Aggressive Growth";
}

function deterministicCommentary(
  e: number,
  c: number,
  p: number,
  riskScore: number
): string {
  const label = getRiskLabel(riskScore);
  const cash = Math.max(0, 100 - e - c - p);

  let notes: string[] = [];

  if (e > 60) notes.push("Equity concentration is high — ensure time horizon supports this volatility.");
  if (e < 15) notes.push("Equity allocation is conservative; consider whether growth objectives are being met.");
  if (p > 30) notes.push("Alternatives allocation exceeds typical ranges — review liquidity requirements and lock-up terms.");
  if (cash > 15) notes.push(`Cash position at ${cash.toFixed(0)}% provides optionality but creates drag in rising markets.`);
  if (c > 50) notes.push("Significant fixed-income allocation — monitor duration risk in a shifting rate environment.");
  if (riskScore >= 8) notes.push("Portfolio carries substantial market risk. Regular rebalancing and stress testing recommended.");
  if (riskScore < 3) notes.push("Portfolio is defensively positioned. Consider gradual equity re-entry to maintain purchasing power.");
  if (notes.length === 0) notes.push("Allocation is well-balanced relative to typical private wealth parameters.");

  return `Risk profile: ${label} (score ${riskScore.toFixed(1)}/10). ${notes.join(" ")}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: AllocateRequest = await request.json();
    const { equity = 40, credit = 30, privateAlt = 20 } = body;

    const clampedE = Math.max(0, Math.min(100, equity));
    const clampedC = Math.max(0, Math.min(100, credit));
    const clampedP = Math.max(0, Math.min(100, privateAlt));
    const cash = Math.max(0, Math.min(100, 100 - clampedE - clampedC - clampedP));
    const riskScore = computeRiskScore(clampedE, clampedC, clampedP);

    const apiKey = process.env.OPENAI_API_KEY;
    let commentary: string;
    let source: "ai" | "deterministic" = "deterministic";

    if (apiKey && apiKey.length > 10) {
      try {
        const resp = await fetch("https://api.openai.com/v1/chat/completions", {
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
                  "You are a private wealth advisor. Provide a concise 2-3 sentence commentary on a portfolio allocation. Be specific and measured. Max 100 words.",
              },
              {
                role: "user",
                content: `Portfolio: ${clampedE.toFixed(0)}% equities, ${clampedC.toFixed(0)}% fixed-income/credit, ${clampedP.toFixed(0)}% private/alternatives, ${cash.toFixed(0)}% cash. Risk score ${riskScore.toFixed(1)}/10.`,
              },
            ],
            max_tokens: 200,
            temperature: 0.3,
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          const aiText = data?.choices?.[0]?.message?.content;
          if (aiText) {
            commentary = aiText;
            source = "ai";
            return NextResponse.json({
              equity: clampedE,
              credit: clampedC,
              privateAlt: clampedP,
              cash,
              riskScore,
              riskLabel: getRiskLabel(riskScore),
              commentary,
              source,
            } satisfies AllocateResponse);
          }
        }
      } catch {
        // fall through
      }
    }

    commentary = deterministicCommentary(clampedE, clampedC, clampedP, riskScore);

    return NextResponse.json({
      equity: clampedE,
      credit: clampedC,
      privateAlt: clampedP,
      cash,
      riskScore,
      riskLabel: getRiskLabel(riskScore),
      commentary,
      source,
    } satisfies AllocateResponse);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Send JSON with equity, credit, privateAlt fields." },
      { status: 400 }
    );
  }
}