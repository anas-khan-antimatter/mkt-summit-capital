import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RiskQuestionnaire from "@/components/marketing/RiskQuestionnaire";
import ScenarioPlanner from "@/components/marketing/ScenarioPlanner";

const strategyGroups = [
  {
    tag: "Public Markets",
    items: [
      {
        title: "Global Equities",
        desc: "High-conviction equity portfolios concentrated in 20–30 positions across developed and select emerging markets. Benchmark-aware but not benchmark-constrained.",
      },
      {
        title: "Investment-Grade Credit",
        desc: "Corporate and government bond ladders with duration management. Emphasis on liquidity and preservation of capital.",
      },
      {
        title: "Multi-Asset Income",
        desc: "Dividend equities, REITs, preferreds, and infrastructure securities structured for yield without excessive risk.",
      },
    ],
  },
  {
    tag: "Alternatives",
    items: [
      {
        title: "Private Placements",
        desc: "Direct co-investment opportunities and select fund access for qualified clients across venture, growth equity, and real assets.",
      },
      {
        title: "Hedge Fund Selections",
        desc: "Fund-of-one and institutional-quality hedge fund mandates with rigorous manager selection and transparency requirements.",
      },
      {
        title: "Real Assets",
        desc: "Timber, farmland, and infrastructure through direct ownership and partnership structures with favourable tax treatment.",
      },
    ],
  },
  {
    tag: "Planning",
    items: [
      {
        title: "Estate & Succession",
        desc: "Trust structuring, generational transfer strategies, and philanthropic vehicle design tailored to family dynamics.",
      },
      {
        title: "Tax-Aware Management",
        desc: "Tax-loss harvesting, municipal bond strategies, and asset location optimisation to minimise after-tax drag.",
      },
      {
        title: "Liquidity & Treasury",
        desc: "Short-duration fixed income, T-bill ladders, and cash-equivalent strategies for operating reserves and near-term liabilities.",
      },
    ],
  },
];

export default function StrategiesPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Strategies</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Precision across <span className="gold-gradient-text font-semibold">asset classes</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            Our investment committee constructs and monitors strategies across public markets,
            alternatives, and tax-aware planning — each tailored to the objectives of the client.
          </p>
        </div>
      </section>

      {/* Strategy Groups */}
      {strategyGroups.map((group) => (
        <section key={group.tag} className="border-t border-amber-500/5 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-amber-600/50 uppercase">
              {group.tag}
            </span>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {group.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800/60 bg-[#10182a]/30 p-7 transition-all hover:border-amber-500/20 hover:bg-[#10182a]/50"
                >
                  <h3 className="text-lg font-heading font-medium text-slate-100">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Interactive Tools */}
      <section className="border-t border-amber-500/5 px-6 py-20 bg-[#080e1a]/30">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
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
      <section className="border-t border-amber-500/5 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
            Which strategies fit your situation?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3 text-sm font-semibold text-[#0b1220] transition-all hover:brightness-110"
          >
            Speak with an advisor
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}