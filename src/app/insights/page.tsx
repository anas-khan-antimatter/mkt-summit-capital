import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const posts = [
  {
    slug: "inflation-and-portfolio-construction",
    title: "Inflation and portfolio construction in a regime-shifted world",
    excerpt: "The old playbook for managing inflation exposure relied on bond proxies. We argue for a more nuanced approach incorporating real assets, floating-rate instruments, and selective equity sector tilts.",
    date: "March 10, 2026",
    readTime: "8 min",
    author: "Alexander Voss",
  },
  {
    slug: "the-case-for-concentration",
    title: "The case for concentration: why fewer positions can mean better outcomes",
    excerpt: "Diversification is the only free lunch — but overdiversification is a tax. We examine the empirical evidence for concentrated portfolios among the world's most successful investors.",
    date: "February 24, 2026",
    readTime: "6 min",
    author: "Catherine Rowe",
  },
  {
    slug: "generational-transfer-tax-landscape",
    title: "The generational transfer tax landscape: what families need to know",
    excerpt: "With estate tax exemptions set to sunset, families with significant wealth face a narrowing window for tax-efficient transfer. A practical guide to current strategy.",
    date: "February 8, 2026",
    readTime: "10 min",
    author: "David Okonkwo",
  },
  {
    slug: "private-credit-risk-realities",
    title: "Private credit: yields, risks, and the realities of illiquidity",
    excerpt: "Direct lending has become a $1.7T asset class. We analyse the risk-adjusted return profile and discuss suitability for different types of private wealth portfolios.",
    date: "January 20, 2026",
    readTime: "7 min",
    author: "Eleanor Hartley",
  },
];

export default function InsightsPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Insights</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Market perspective <span className="brass-gradient-text font-semibold">without the noise</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            Original research and commentary from our investment committee — written for principals,
            not for clicks. No ads, no paywall, no sensationalism.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="border-t border-amber-500/5 px-6 py-16 bg-[#080e1a]/30">
        <div className="mx-auto max-w-4xl space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass-panel rounded-2xl p-8 transition-all duration-500 hover:border-amber-500/30"
            >
              <div className="flex flex-wrap items-center gap-4 text-[11px] tracking-wide text-amber-600/60 uppercase">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span>{post.author}</span>
              </div>
              <h2 className="mt-4 text-xl font-heading font-medium text-slate-100 leading-snug">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/insights/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm text-amber-500 transition-colors hover:text-amber-400"
              >
                Read more
                <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-amber-500/5 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
            Want these delivered to your inbox?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
            Receive our quarterly letter and select research notes. No spam — ever.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 brass-gradient rounded-full px-7 py-3 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110"
          >
            Subscribe
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}