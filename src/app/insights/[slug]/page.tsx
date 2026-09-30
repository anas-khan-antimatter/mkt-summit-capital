import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Static post data — in production this would come from a CMS
const posts: Record<string, { title: string; date: string; author: string; readTime: string; content: string }> = {
  "inflation-and-portfolio-construction": {
    title: "Inflation and portfolio construction in a regime-shifted world",
    date: "March 10, 2026",
    author: "Alexander Voss",
    readTime: "8 min",
    content: `The inflationary regime that began in 2021 has forced a fundamental reassessment of portfolio construction principles that held for the prior two decades. The old playbook — allocating heavily to long-duration bonds as a deflation hedge and relying on broad equity beta for growth — no longer provides the diversification it once did.

## The structural shift

Several forces suggest inflation may remain structurally higher than the 2010–2020 era: deglobalisation, demographic aging in developed markets, the energy transition's capital demands, and more expansive fiscal policy. Whether or not central banks hit their 2% targets consistently, portfolios must be built to tolerate a wider range of inflation outcomes.

## Building resilience

We have been increasing allocations to:

- **Real assets**: Timber, infrastructure, and inflation-linked bonds provide direct inflation pass-through.
- **Floating-rate instruments**: Senior secured loans and floating-rate notes adjust with rising rates.
- **Equity sectors with pricing power**: Healthcare, select technology, and certain industrials can pass cost increases through to customers.
- **Commodity exposure**: A modest strategic allocation to commodities provides a hedge against supply-shock inflation.

## Conclusion

The key insight is not to predict inflation but to build portfolios that can perform across a range of scenarios. That means diversifying across inflation regimes, not just asset classes.`,
  },
  "the-case-for-concentration": {
    title: "The case for concentration: why fewer positions can mean better outcomes",
    date: "February 24, 2026",
    author: "Catherine Rowe",
    readTime: "6 min",
    content: `Diversification is often called the only free lunch in investing. But like any lunch, you can overeat. When portfolios become too diluted — holding hundreds of positions across dozens of funds — the benefits of diversification diminish while costs, complexity, and tracking error to a simple index increase.

## The empirical case

Research shows that a portfolio of 20–30 carefully selected stocks captures the vast majority of diversification benefits. Beyond that, each additional position adds more complexity than risk reduction. The world's most successful investors — from Buffett to the great endowment funds — have historically run concentrated portfolios.

## Implementation

Concentration does not mean recklessness. It means:

1. Deeper due diligence on each position
2. Willingness to hold through volatility
3. Lower turnover and lower tax drag
4. Alignment of interest — our capital sits alongside yours

## Conclusion

A concentrated portfolio demands more of the investor — or in our case, the advisor. But the evidence is clear: conviction-weighted portfolios have historically outperformed closet index funds over long time horizons.`,
  },
  "generational-transfer-tax-landscape": {
    title: "The generational transfer tax landscape: what families need to know",
    date: "February 8, 2026",
    author: "David Okonkwo",
    readTime: "10 min",
    content: `The Tax Cuts and Jobs Act (TCJA) of 2017 doubled the federal estate tax exemption to approximately $13.6 million per individual ($27.2 million for married couples). This provision is scheduled to sunset at the end of 2026, reverting to the pre-2018 level of roughly $7 million per individual (adjusted for inflation).

## The urgency

For families with significant wealth, the window to transfer assets using the current elevated exemption is narrowing. Planning should begin at least 12–18 months before the sunset to allow for proper structuring.

## Strategies to consider

- **Spousal lifetime access trusts (SLATs)**: Allow one spouse to transfer assets to a trust for the benefit of the other spouse and descendants.
- **Grantor retained annuity trusts (GRATs)**: Freeze the value of appreciating assets for estate tax purposes.
- **Charitable remainder trusts**: Provide income while reducing taxable estate value.
- **Annual gifting programmes**: Use the $18,000 per donee annual exclusion strategically.

## Conclusion

The sunset of the TCJA exemption creates both urgency and opportunity. Families who act now can lock in substantial tax advantages for generations.`,
  },
  "private-credit-risk-realities": {
    title: "Private credit: yields, risks, and the realities of illiquidity",
    date: "January 20, 2026",
    author: "Eleanor Hartley",
    readTime: "7 min",
    content: `Private credit has emerged as one of the fastest-growing asset classes, with direct lending now representing approximately $1.7 trillion globally. The asset class offers attractive yields in a yield-scarce world, but investors must understand the risks that accompany illiquidity premiums.

## The opportunity

Banks have retreated from middle-market lending, creating a gap that private credit funds have filled. For qualified investors, direct lending can offer:

- Yields 300–500 basis points above public market equivalents
- Floating-rate coupons that protect against rising rates
- Covenant protections that are stronger than in broadly syndicated loans

## The risks

- **Illiquidity**: Most funds have 5–10 year lock-ups. There is no secondary market for most positions.
- **Valuation uncertainty**: Private loans are marked periodically, not daily.
- **Covenant erosion**: As capital has flooded into the space, terms have loosened.
- **Concentration risk**: A single default can meaningfully impact returns.

## Conclusion

Private credit has a place in many portfolios — but only for investors who can tolerate illiquidity and who understand that the yield premium is, in part, compensation for risks that are not immediately visible in a low-default environment.`,
  },
};

export default async function InsightsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="pt-28 pb-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-heading font-light text-slate-100">Insight not found</h1>
          <p className="mt-4 text-sm text-slate-400">This article may have been removed or the link is incorrect.</p>
          <Link href="/insights" className="mt-8 inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400">
            <ArrowLeft size={14} /> Back to insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/insights" className="inline-flex items-center gap-2 text-xs tracking-wider text-amber-500 hover:text-amber-400 uppercase">
            <ArrowLeft size={12} /> Back to insights
          </Link>
          <h1 className="mt-6 text-3xl font-heading font-light tracking-tight md:text-4xl text-slate-100">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-xs tracking-wide text-amber-600/70 uppercase">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      <section className="border-t border-amber-500/5 px-6 py-16">
        <article className="prose prose-invert mx-auto max-w-3xl prose-headings:font-heading prose-headings:font-light prose-headings:text-slate-100 prose-p:text-slate-400 prose-p:leading-relaxed prose-strong:text-amber-400 prose-li:text-slate-400">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <h2 key={i} className="mt-10 mb-4 text-2xl font-heading font-light text-slate-100">{line.replace("## ", "")}</h2>;
            }
            if (line.startsWith("### ")) {
              return <h3 key={i} className="mt-6 mb-3 text-xl font-heading font-light text-slate-100">{line.replace("### ", "")}</h3>;
            }
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
              if (match) {
                return (
                  <li key={i} className="ml-6 list-disc text-slate-400">
                    <strong className="text-amber-400">{match[1]}</strong>: {match[2]}
                  </li>
                );
              }
            }
            if (line.startsWith("- ")) {
              return <li key={i} className="ml-6 list-disc text-slate-400">{line.replace("- ", "")}</li>;
            }
            if (line.startsWith("1. ")) {
              return <li key={i} className="ml-6 list-decimal text-slate-400">{line.replace(/^\d+\. /, "")}</li>;
            }
            if (line.trim() === "") {
              return <div key={i} className="h-4" />;
            }
            return <p key={i} className="text-base text-slate-400 leading-relaxed">{line}</p>;
          })}
        </article>
      </section>

      <section className="border-t border-amber-500/5 px-6 py-16 text-center">
        <Link href="/insights" className="inline-flex items-center gap-2 rounded-full border border-slate-600/50 px-6 py-2.5 text-sm text-slate-300 transition-all hover:border-amber-500/30 hover:text-amber-400">
          <ArrowLeft size={14} /> All insights
        </Link>
      </section>
    </div>
  );
}