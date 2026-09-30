import Link from "next/link";

const pillars = [
  { title: "Discretion", body: "Private counsel for families and founders who value quiet competence." },
  { title: "Clarity", body: "Portfolios explained in plain language—risk, liquidity, and time horizon first." },
  { title: "Stewardship", body: "Multi-generational planning that protects what you have already built." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1220] text-slate-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-wide">Summit Capital</div>
        <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
          <a href="#approach" className="hover:text-white">Approach</a>
          <a href="#strategies" className="hover:text-white">Strategies</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <Link href="#contact" className="rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-amber-400">
          Request a conversation
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/90">Private wealth</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Capital guided with calm conviction
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Summit Capital partners with discerning families to preserve wealth, compound thoughtfully,
          and navigate markets without noise.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="#contact" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">
            Speak with an advisor
          </Link>
          <a href="#approach" className="rounded-full border border-slate-600 px-6 py-3 text-sm text-slate-200 hover:border-slate-400">
            Our approach
          </a>
        </div>
      </section>

      <section id="approach" className="border-y border-slate-800 bg-slate-950/50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold">Built for long horizons</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-800 bg-[#10182a] p-6">
                <h3 className="text-lg font-medium text-amber-300">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="strategies" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold">Strategies</h2>
        <ul className="mt-8 space-y-4 text-slate-300">
          <li className="rounded-xl border border-slate-800 px-5 py-4">Global equities &amp; credit with deliberate concentration</li>
          <li className="rounded-xl border border-slate-800 px-5 py-4">Private market access for qualified clients</li>
          <li className="rounded-xl border border-slate-800 px-5 py-4">Tax-aware estate and liquidity planning</li>
        </ul>
      </section>

      <section id="contact" className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-amber-500/20 to-slate-900 px-10 py-14 ring-1 ring-amber-500/30">
          <h2 className="text-3xl font-semibold">Begin a private conversation</h2>
          <p className="mt-3 max-w-xl text-slate-300">
            Tell us about your goals. We respond personally within two business days.
          </p>
          <Link href="mailto:hello@summitcapital.example" className="mt-8 inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400">
            hello@summitcapital.example
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-xs text-slate-500">
        © 2026 Summit Capital. For illustration only — not an offer of securities.
      </footer>
    </main>
  );
}
