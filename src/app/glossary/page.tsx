import Link from "next/link";
import { ArrowRight, BookText } from "lucide-react";

const terms = [
  { term: "Allocation", definition: "The distribution of investment capital across asset classes such as equities, fixed income, alternatives, and cash. The optimal allocation depends on time horizon, risk tolerance, and liquidity needs." },
  { term: "Alternatives", definition: "Non-traditional asset classes including private equity, hedge funds, real estate, infrastructure, timber, and commodities. These often offer diversification benefits and illiquidity premiums." },
  { term: "Alpha", definition: "A measure of active return — the excess return of an investment relative to its benchmark index. Positive alpha suggests manager skill has added value." },
  { term: "Beta", definition: "A measure of systematic market risk. A beta of 1.0 indicates the investment moves in line with the market; above 1.0 indicates higher volatility than the market." },
  { term: "Capital Preservation", definition: "An investment approach prioritising the protection of principal over growth. Typically involves high allocation to cash, short-duration bonds, and investment-grade credit." },
  { term: "Concentrated Portfolio", definition: "An investment strategy holding a limited number of high-conviction positions (typically 15–30) rather than diversifying broadly. Emphasises deep research and conviction-weighted sizing." },
  { term: "Correlation", definition: "A statistical measure of how two investments move in relation to each other. Low or negative correlation between asset classes provides portfolio diversification benefits." },
  { term: "Duration", definition: "A measure of a bond's sensitivity to interest rate changes. A duration of 5 years implies the bond's price would change approximately 5% per 1% change in interest rates." },
  { term: "End-to-End Encryption", definition: "A security protocol ensuring data is encrypted on the sender's device and only decrypted by the intended recipient. Summit Capital uses end-to-end encryption for all client communications." },
  { term: "Estate Planning", definition: "The process of arranging for the management and transfer of wealth during and after a person's lifetime. Includes trusts, wills, powers of attorney, and tax-efficient transfer strategies." },
  { term: "Family Office", definition: "A private wealth management firm serving ultra-high-net-worth families. Provides comprehensive services including investment management, estate planning, tax strategy, and philanthropy coordination." },
  { term: "Fixed Income", definition: "Securities that pay a fixed rate of return, including government bonds, corporate bonds, municipal bonds, and structured credit. Core component of capital preservation and income strategies." },
  { term: "Grantor Retained Annuity Trust (GRAT)", definition: "An irrevocable trust that allows the grantor to transfer appreciating assets to beneficiaries while freezing the taxable value at the time of transfer. Effective for estate tax reduction." },
  { term: "Hedge Fund", definition: "An investment vehicle that uses pooled funds and employs various strategies — long/short equity, arbitrage, event-driven, macro — to generate returns independent of market direction." },
  { term: "Illiquidity Premium", definition: "The additional return investors expect to earn for holding assets that cannot be easily sold or traded. Common in private equity, real estate, and direct lending." },
  { term: "Investment Policy Statement (IPS)", definition: "A formal document outlining a client's investment objectives, risk tolerance, asset allocation parameters, and governance framework. The IPS serves as the foundational guide for portfolio management." },
  { term: "Laddering", definition: "A fixed-income strategy of purchasing bonds with staggered maturity dates to provide regular cash flows and manage reinvestment risk across different interest rate environments." },
  { term: "Net Worth", definition: "Total assets minus total liabilities. For wealth management purposes, net worth is evaluated inclusive of liquid investments, real estate, business interests, and personal property." },
  { term: "Private Credit", definition: "Debt financing provided by non-bank lenders to middle-market companies. Typically offers higher yields than public credit in exchange for reduced liquidity and greater due diligence requirements." },
  { term: "Real Return", definition: "The investment return after adjusting for inflation. A nominal return of 7% with inflation at 3% produces a real return of approximately 4%. Real return determines true purchasing power growth." },
  { term: "Risk Tolerance", definition: "An investor's ability and willingness to withstand portfolio volatility and drawdowns. Assessed through a combination of financial capacity, time horizon, and psychological comfort with market fluctuations." },
  { term: "Spousal Lifetime Access Trust (SLAT)", definition: "An irrevocable trust created by one spouse for the benefit of the other spouse and descendants. Allows wealth transfer while maintaining indirect access to trust assets through the beneficiary spouse." },
  { term: "Stewardship", definition: "The philosophy of managing wealth as a long-term responsibility rather than a short-term financial exercise. Central to Summit Capital's approach — emphasising preservation, governance, and generational thinking." },
  { term: "Tax-Loss Harvesting", definition: "The practice of selling securities at a loss to offset capital gains and reduce tax liability. Losses can be carried forward to offset future gains, improving after-tax returns." },
  { term: "Trust", definition: "A legal entity that holds assets for the benefit of designated beneficiaries. Trusts are used extensively in estate planning to control wealth distribution, minimise taxes, and protect assets." },
];

export default function GlossaryPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Reference</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Glossary of <span className="brass-gradient-text font-semibold">Terms</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            A concise reference to the terminology used across our strategies, research, and
            client conversations. Plain language, precise definitions.
          </p>
        </div>
      </section>

      <section className="border-t etched-divider px-6 py-16 pattern-vault">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-1">
            {terms.map((t, i) => (
              <details
                key={t.term}
                className="group rounded-xl transition-all duration-200 open:bg-[#0c172e]/40 hover:bg-[#0c172e]/20"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-heading font-medium text-slate-200 transition-colors group-hover:text-amber-300">
                  <span>{t.term}</span>
                  <span className="text-amber-500/40 transition-transform duration-200 group-open:rotate-90">
                    <ArrowRight size={12} />
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-amber-500/20 pl-4">
                    {t.definition}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t etched-divider px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <BookText size={24} className="mx-auto text-amber-500/50" />
          <h2 className="mt-4 text-2xl font-heading font-light tracking-tight md:text-3xl text-slate-100">
            Have a term we did not cover?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
            Our advisors are always available to explain any concept in plain English.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 brass-gradient rounded-full px-7 py-3 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110"
          >
            Ask an advisor
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}