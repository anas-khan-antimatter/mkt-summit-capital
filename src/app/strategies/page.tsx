"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, TrendingUp, Shield, Building2, Library, Coins, Landmark, TreePine, Scale, FileSearch, Plus } from "lucide-react";
import RiskQuestionnaire from "@/components/marketing/RiskQuestionnaire";
import ScenarioPlanner from "@/components/marketing/ScenarioPlanner";

interface StrategyItem {
  title: string;
  desc: string;
  sleeve: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  riskLevel: string;
  minHorizon: string;
}

interface StrategyGroup {
  tag: string;
  items: StrategyItem[];
}

const strategyGroups: StrategyGroup[] = [
  {
    tag: "Public Markets",
    items: [
      {
        title: "Global Equities",
        desc: "High-conviction equity portfolios concentrated in 20–30 positions across developed and select emerging markets.",
        icon: TrendingUp,
        riskLevel: "Moderate-High",
        minHorizon: "5+ years",
        sleeve: "Our equity strategy is conviction-weighted, not index-constrained. We focus on companies with durable competitive advantages, high returns on invested capital, and management teams with meaningful alignment. Positions are sized according to conviction, with the top ten holdings typically representing 50–65% of the equity allocation. We avoid overcrowded trades and prefer businesses where our research gives us an informational edge. Sector exposure is a byproduct of bottom-up selection rather than top-down tilts, though we maintain awareness of macro risks through our investment committee framework.",
      },
      {
        title: "Investment-Grade Credit",
        desc: "Corporate and government bond ladders with duration management. Emphasis on liquidity and preservation of capital.",
        icon: Shield,
        riskLevel: "Low-Moderate",
        minHorizon: "1–7 years",
        sleeve: "Our fixed-income approach is built around laddered maturities, typically ranging from 1 to 10 years. We purchase individual bonds rather than funds, giving us control over credit quality, duration, and maturity timing. The portfolio is predominantly AAA through A rated, with selective allocation to BBB where the yield premium adequately compensates for the incremental risk. Duration is managed tactically based on our macro outlook: we shorten when rate volatility is elevated and extend when the yield curve offers attractive term premiums. Municipal bonds are used for taxable accounts where the after-tax yield advantage applies.",
      },
      {
        title: "Multi-Asset Income",
        desc: "Dividend equities, REITs, preferreds, and infrastructure securities structured for consistent yield.",
        icon: Coins,
        riskLevel: "Moderate",
        minHorizon: "3+ years",
        sleeve: "The income strategy diversifies across multiple yield-generating asset classes to avoid concentration in any single income source. Dividend-paying equities provide growth potential plus income, REITs offer real estate exposure with mandatory distribution requirements, preferred securities deliver higher contractual yields, and infrastructure assets provide inflation-linked cash flows. The portfolio targets a yield of 3–5% with a focus on sustainability of distributions rather than maximum yield. We avoid yield traps by stress-testing each holding's ability to maintain or grow its distribution through a recessionary scenario.",
      },
    ],
  },
  {
    tag: "Alternatives",
    items: [
      {
        title: "Private Placements",
        desc: "Direct co-investment and select fund access for qualified clients across venture, growth equity, and real assets.",
        icon: Building2,
        riskLevel: "High",
        minHorizon: "7–12 years",
        sleeve: "Private placements provide access to investment opportunities unavailable in public markets. We focus on direct co-investments alongside experienced sponsor partners, which allows us to negotiate terms, avoid blind pool risk, and reduce fee layers. Our due diligence process evaluates each opportunity across five dimensions: market position, management quality, financial structure, exit pathway, and alignment of interests. Target allocations are sized to the client's overall portfolio and liquidity requirements — we generally recommend that private placements not exceed 25% of total assets, with individual positions kept below 5% to manage concentration risk.",
      },
      {
        title: "Hedge Fund Selections",
        desc: "Fund-of-one and institutional-quality hedge fund mandates with rigorous manager selection and transparency.",
        icon: Library,
        riskLevel: "Moderate-High",
        minHorizon: "3–5 years",
        sleeve: "Our hedge fund programme focuses on managers with demonstrated skill in generating returns that are uncorrelated to broad equity and fixed-income markets. We prefer strategies with clear, repeatable edge: long/short equity with fundamental bottoms-up research, event-driven arbitrage, and relative-value credit. We avoid macro and systematic trend-following strategies due to their higher volatility and lower risk-adjusted returns in our experience. Each manager undergoes a comprehensive operational due diligence review covering back-office infrastructure, prime brokerage relationships, valuation policies, and liquidity terms. Minimum allocation of $1M per mandate.",
      },
      {
        title: "Real Assets",
        desc: "Timber, farmland, and infrastructure through direct ownership and partnership structures.",
        icon: TreePine,
        riskLevel: "Moderate",
        minHorizon: "10+ years",
        sleeve: "Real assets provide inflation protection, income, and diversification benefits that are distinct from financial assets. Our real asset allocation spans timberland (which offers biological growth plus commodity exposure), farmland (providing food-security-linked returns), and infrastructure (regulated utilities, transportation, and energy assets with long-duration, inflation-linked cash flows). These assets are held through direct ownership or partnership structures that offer favourable tax treatment, including depreciation benefits and capital gains treatment upon disposition. Illiquidity is a feature, not a bug — clients should expect to hold for a minimum of 10 years.",
      },
    ],
  },
  {
    tag: "Planning",
    items: [
      {
        title: "Estate & Succession",
        desc: "Trust structuring, generational transfer strategies, and philanthropic vehicle design tailored to family dynamics.",
        icon: Scale,
        riskLevel: "N/A (Planning)",
        minHorizon: "Multi-generational",
        sleeve: "Estate planning is about ensuring that wealth serves its intended purpose across generations. We work with your legal counsel to design trust structures — including SLATs, GRATs, IDGTs, and dynasty trusts — that minimise estate taxes while providing for beneficiaries in a controlled manner. Beyond tax efficiency, we address governance: family mission statements, investment committee charters, and next-generation education programmes. Our approach is values-first: we help families articulate what their wealth is for before deciding how to structure it. Regular reviews ensure plans remain current with changes in tax law and family circumstances.",
      },
      {
        title: "Tax-Aware Management",
        desc: "Tax-loss harvesting, municipal bond strategies, and asset location to minimise after-tax drag.",
        icon: FileSearch,
        riskLevel: "Client-specific",
        minHorizon: "Ongoing",
        sleeve: "Tax-aware investing recognises that what matters is what you keep, not what you earn. Our approach has four pillars: (1) asset location — placing tax-inefficient assets in tax-advantaged accounts and tax-efficient assets in taxable accounts; (2) tax-loss harvesting — systematically realising losses to offset gains, with carry-forward provisions for future years; (3) municipal bond allocation — using federal and state tax-exempt bonds for clients in high tax brackets; and (4) charitable strategies — including donor-advised funds and charitable remainder trusts for clients with philanthropic goals. We generate a tax efficiency report annually alongside performance reporting.",
      },
      {
        title: "Liquidity & Treasury",
        desc: "Short-duration fixed income, T-bill ladders, and cash-equivalent strategies for operating reserves.",
        icon: Landmark,
        riskLevel: "Low",
        minHorizon: "0–2 years",
        sleeve: "Cash and liquidity management is often overlooked but critical to portfolio resilience. We construct T-bill ladders with maturities ranging from 4 weeks to 12 months to provide regular cash flows and yield optimisation. For clients with larger cash positions, we use ultra-short bond ETFs, money market funds with institutional share classes, and structured CDs with FDIC coverage. Our liquidity framework categorises reserves into three tiers: operating (daily needs, held in cash or money markets), contingency (3–6 months of expenses, held in short-duration bonds), and strategic (dry powder for opportunities, held in T-bills or short corporates with 6–12 month maturities).",
      },
    ],
  },
];

export default function StrategiesPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggleItem(title: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }

  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Strategies</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Precision across <span className="brass-gradient-text font-semibold">asset classes</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            Our investment committee constructs and monitors strategies across public markets,
            alternatives, and tax-aware planning — each tailored to the objectives of the client.
          </p>
        </div>
      </section>

      {/* Strategy Groups with expandable sleeves */}
      {strategyGroups.map((group) => (
        <section key={group.tag} className="etched-divider px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-amber-500/10" />
              <span className="text-xs font-semibold tracking-[0.2em] text-amber-600/50 uppercase">
                {group.tag}
              </span>
              <span className="h-px flex-1 bg-amber-500/10" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isOpen = openItems.has(item.title);
                return (
                  <div
                    key={item.title}
                    className="glass-panel rounded-2xl transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(item.title)}
                      className="w-full p-7 text-left focus:outline-none"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/15 bg-amber-500/5 shrink-0">
                          <Icon size={18} className="text-amber-500/70" />
                        </div>
                        <ChevronDown
                          size={16}
                          className={`mt-2 text-amber-500/40 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <h3 className="mt-5 text-lg font-heading font-medium text-slate-100">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-amber-500/15 bg-amber-500/5 px-2.5 py-0.5 text-[10px] text-amber-400/80">
                          {item.riskLevel}
                        </span>
                        <span className="rounded-full border border-slate-700 bg-slate-800/30 px-2.5 py-0.5 text-[10px] text-slate-500">
                          {item.minHorizon}
                        </span>
                      </div>
                    </button>

                    {/* Expandable sleeve */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-amber-500/10 px-7 pb-7 pt-5">
                        <p className="text-sm text-slate-400 leading-relaxed">{item.sleeve}</p>
                        <div className="mt-4">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors"
                          >
                            Discuss this strategy
                            <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Interactive Tools */}
      <section className="pattern-vault etched-divider px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl text-slate-100">
            Plan with purpose
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-400">
            Use these interactive tools to explore scenarios and understand your risk profile.
            All calculations are illustrative — your advisor will build the formal plan.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <RiskQuestionnaire />
            <ScenarioPlanner />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl text-slate-100">
            Which strategies fit your situation?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 brass-gradient rounded-full px-7 py-3 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110"
          >
            Speak with an advisor
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}