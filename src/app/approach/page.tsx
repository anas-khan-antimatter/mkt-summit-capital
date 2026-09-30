import Link from "next/link";
import { ArrowRight, Shield, Eye, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Shield,
    title: "Preserve First",
    body: "Every allocation begins with a question: what is the downside? We structure portfolios to survive stress scenarios before optimising for upside.",
  },
  {
    icon: Eye,
    title: "Clarity Over Complexity",
    body: "We do not use products we cannot explain in plain language. Every position, every structure has a clear rationale tied to your specific goals.",
  },
  {
    icon: Sparkles,
    title: "Patience as Strategy",
    body: "Our average holding period is measured in years, not quarters. We resist the urge to trade noise and focus on compounding through cycles.",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "We spend time understanding your liquidity needs, risk tolerance, family dynamics, and long-term objectives." },
  { step: "02", title: "Blueprint", desc: "A custom investment policy statement is drafted, outlining asset allocation, income needs, and estate considerations." },
  { step: "03", title: "Implementation", desc: "Portfolios are built using direct securities, select funds, and private placements where appropriate." },
  { step: "04", title: "Stewardship", desc: "Ongoing rebalancing, tax optimisation, and quarterly reviews with your principal advisor." },
];

export default function ApproachPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Approach</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Philosophy of <span className="brass-gradient-text font-semibold">quiet stewardship</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            We believe wealth is a responsibility, not a scoreboard. Our approach is defined by
            three principles that guide every decision we make with clients.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-amber-500/5 px-6 py-20 bg-[#080e1a]/30">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="glass-panel rounded-2xl p-8 glow-gold">
                <Icon size={22} className="text-amber-500/70" />
                <h2 className="mt-5 text-xl font-heading font-medium gold-gradient-text">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
            How we work with you
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {process.map((p) => (
              <div key={p.step} className="relative">
                <span className="text-4xl font-heading font-bold text-amber-500/15">{p.step}</span>
                <h3 className="mt-2 text-lg font-heading font-medium text-slate-100">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-amber-500/5 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
            Ready to discuss your approach?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full gold-gradient px-7 py-3 text-sm font-semibold text-[#0b1220] transition-all hover:brightness-110"
          >
            Start a conversation
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}