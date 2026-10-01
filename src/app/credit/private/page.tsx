import Link from "next/link";
import { ArrowRight, Shield, Building2, Eye, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Direct Co-Investment",
    body: "Access to vetted private placement opportunities alongside our principals. Minimum commitments are structured to align incentives, not to create barriers.",
  },
  {
    icon: Building2,
    title: "Select Fund Access",
    body: "Curated network of specialist funds in real estate, infrastructure, private credit, and venture capital — each subject to our operational due diligence.",
  },
  {
    icon: Eye,
    title: "Structured Oversight",
    body: "Every private position is monitored through quarterly reporting, independent valuations, and transparent fee disclosure. No hidden carried interest structures.",
  },
];

export default function CreditPrivatePage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">
            Private Capital
          </p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Private Placements &amp;{" "}
            <span className="brass-gradient-text font-semibold">Alternatives</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            For qualified clients seeking differentiated return streams, we facilitate direct and
            co-investment opportunities across private markets — each rigorously reviewed against
            our preservation-first mandate.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-amber-500/5 px-6 py-20">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="glass-panel rounded-2xl p-8 glow-gold transition-all duration-500 hover:border-amber-500/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <Icon size={18} className="text-amber-500/80" />
                </div>
                <h2 className="mt-5 text-lg font-heading font-medium brass-gradient-text">
                  {f.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Suitability */}
      <section className="border-t border-amber-500/5 px-6 py-20 bg-[#080e1a]/30">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
            Suitability &amp; Requirements
          </h2>
          <div className="mt-10 space-y-6">
            {[
              {
                label: "Accreditation",
                desc: "Opportunities are limited to accredited investors and qualified purchasers as defined under applicable securities regulations.",
              },
              {
                label: "Liquidity Horizon",
                desc: "Private placements typically carry lock-up periods of 3–7 years. Positions are illiquid and should represent a defined allocation within a diversified portfolio.",
              },
              {
                label: "Minimum Commitment",
                desc: "Minimums vary by opportunity, typically starting at $250,000. Co-investment structures may offer lower entry points.",
              },
              {
                label: "Fee Transparency",
                desc: "All fees, carried interest, and expense ratios are disclosed in writing before commitment. We do not accept retrocessions or soft-dollar arrangements.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-700/50 bg-[#0c172e]/70 p-5"
              >
                <div className="flex items-start gap-3">
                  <Sparkles size={14} className="mt-0.5 text-amber-500/60" />
                  <div>
                    <h3 className="text-sm font-heading font-medium text-slate-100">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-amber-500/5 px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
            Interested in private capital access?
          </h2>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Contact our team to discuss your accreditation status and investment objectives.
            A principal will follow up within two business days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 brass-gradient rounded-full px-7 py-3 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110"
          >
            Submit an enquiry
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}