import Link from "next/link";
import { ArrowRight, Shield, BarChart3, Users, Building2, ScrollText } from "lucide-react";

const philosophyCards = [
  {
    icon: Shield,
    title: "Capital Preservation",
    body: "We prioritise downside protection. Our core portfolios are built to withstand cycles without sacrificing real returns.",
  },
  {
    icon: BarChart3,
    title: "Concentrated Conviction",
    body: "We hold fewer positions — each rigorously analysed. Breadth is not a substitute for depth.",
  },
  {
    icon: Users,
    title: "Multi-Generational",
    body: "Tax-aware estate structures, trust vehicles, and liquidity planning that extend beyond a single lifetime.",
  },
];

const strategyPreviews = [
  {
    title: "Global Equities & Credit",
    tag: "Public Markets",
    desc: "Concentrated portfolios of high-conviction equities and investment-grade credit.",
  },
  {
    title: "Private Placements",
    tag: "Alternatives",
    desc: "Direct co-investment and select fund access for qualified clients.",
  },
  {
    title: "Liquidity & Treasury",
    tag: "Cash Management",
    desc: "Treasury bill ladders, short-duration bonds, and cash-equivalent strategies.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ---- HERO ---- */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(200,164,92,0.08),transparent_60%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/80 uppercase">
            Private Wealth Counsel
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-light leading-tight tracking-tight md:text-7xl font-heading">
            Capital guided with
            <br />
            <span className="brass-gradient-text font-semibold">calm conviction</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            Summit Capital partners with discerning families and founders to preserve wealth,
            compound thoughtfully, and navigate markets without noise.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group gold-gradient rounded-full px-7 py-3 text-sm font-semibold text-[#0b1220] transition-all hover:brightness-110 inline-flex items-center gap-2"
            >
              Speak with an advisor
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/approach"
              className="rounded-full border border-slate-600/50 px-7 py-3 text-sm text-slate-300 transition-all hover:border-amber-500/30 hover:text-amber-400"
            >
              Our philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* ---- PHILOSOPHY / APPROACH PREVIEW ---- */}
      <section className="border-t border-amber-500/5 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">
              Philosophy
            </p>
            <h2 className="mt-4 text-3xl font-heading font-light tracking-tight md:text-4xl">
              Built for long horizons
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              We do not chase quarterly metrics. Every allocation, every structure is designed
              around a multi-decade time horizon — because wealth that lasts is built slowly.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {philosophyCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="glass-panel rounded-2xl p-7 glow-gold transition-all duration-500 hover:border-amber-500/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/5">
                    <Icon size={18} className="text-amber-500/80" />
                  </div>
                  <h3 className="mt-5 text-lg font-heading font-medium gold-gradient-text">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10">
            <Link
              href="/approach"
              className="inline-flex items-center gap-2 text-sm text-amber-500 transition-colors hover:text-amber-400"
            >
              Read our full approach
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- STRATEGIES PREVIEW ---- */}
      <section className="border-t border-amber-500/5 px-6 py-24 bg-[#080e1a]/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">
                Strategies
              </p>
              <h2 className="mt-4 text-3xl font-heading font-light tracking-tight md:text-4xl">
                Precision across asset classes
              </h2>
            </div>
            <Link
              href="/strategies"
              className="hidden text-sm text-amber-500 transition-colors hover:text-amber-400 md:inline-flex items-center gap-2"
            >
              View all strategies
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {strategyPreviews.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-800/60 bg-[#10182a]/50 p-6 transition-all hover:border-amber-500/20 hover:bg-[#10182a]"
              >
                <span className="text-[10px] font-semibold tracking-[0.2em] text-amber-600/70 uppercase">
                  {s.tag}
                </span>
                <h3 className="mt-3 text-lg font-heading font-medium text-slate-100">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/strategies"
              className="inline-flex items-center gap-2 text-sm text-amber-500"
            >
              View all strategies
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- TEAM PREVIEW ---- */}
      <section className="border-t border-amber-500/5 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">
              Team
            </p>
            <h2 className="mt-4 text-3xl font-heading font-light tracking-tight md:text-4xl">
              Principals you work with
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Every client relationship is managed by a senior principal. Our team averages over
              twenty years of institutional and private wealth experience.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 px-6 py-2.5 text-sm text-slate-300 transition-all hover:border-amber-500/30 hover:text-amber-400"
            >
              Meet the team
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- INSIGHTS PREVIEW ---- */}
      <section className="border-t border-amber-500/5 px-6 py-24 bg-[#080e1a]/50">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">
              Insights
            </p>
            <h2 className="mt-4 text-3xl font-heading font-light tracking-tight md:text-4xl">
              Market perspective without the noise
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Original research and commentary from our investment committee — written for
              principals, not for clicks.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 px-6 py-2.5 text-sm text-slate-300 transition-all hover:border-amber-500/30 hover:text-amber-400"
            >
              Read insights
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA / CONTACT ---- */}
      <section className="border-t border-amber-500/5 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel gold-gradient rounded-3xl px-10 py-16 text-center md:px-20 md:py-20">
            <ScrollText size={28} className="mx-auto text-amber-500/60" />
            <h2 className="mt-6 text-3xl font-heading font-light tracking-tight md:text-4xl">
              Begin a private conversation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
              Tell us about your goals, timeline, and concerns. A principal responds personally
              within two business days.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="gold-gradient rounded-full px-7 py-3 text-sm font-semibold text-[#0b1220] transition-all hover:brightness-110"
              >
                Submit an enquiry
              </Link>
              <Link
                href="mailto:hello@summitcapital.com"
                className="rounded-full border border-amber-500/30 px-7 py-3 text-sm text-amber-400 transition-all hover:border-amber-400 hover:bg-amber-500/5"
              >
                hello@summitcapital.com
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- QUOTE / EPILOGUE ---- */}
      <section className="border-t border-amber-500/5 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg italic text-slate-500 font-heading leading-relaxed">
            &ldquo;Wealth is not about how much you have — it is about how much you keep
            and what it makes possible.&rdquo;
          </p>
          <p className="mt-4 text-xs tracking-[0.2em] text-amber-600/50 uppercase">
            — Summit Capital, Principles of Stewardship
          </p>
        </div>
      </section>
    </main>
  );
}