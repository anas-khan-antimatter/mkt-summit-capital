"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal, TrendingUp, Banknote, Building2, PieChart, Loader2 } from "lucide-react";

interface AllocateResult {
  equity: number;
  credit: number;
  privateAlt: number;
  cash: number;
  riskScore: number;
  riskLabel: string;
  commentary: string;
  source: "ai" | "deterministic";
}

function DonutChart({ equity, credit, privateAlt, cash }: { equity: number; credit: number; privateAlt: number; cash: number }) {
  const segments = [
    { label: "Equities", pct: equity, color: "#4a7c59" },
    { label: "Credit/Income", pct: credit, color: "#b8944e" },
    { label: "Alternatives", pct: privateAlt, color: "#7a5ea7" },
    { label: "Cash", pct: cash, color: "#6b8e9b" },
  ].filter((s) => s.pct > 0);

  const total = segments.reduce((sum, s) => sum + s.pct, 0);
  let cumulative = 0;

  const cx = 100, cy = 100, r = 80;

  function polarToCartesian(angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(start: number, end: number) {
    const s = polarToCartesian(end);
    const e = polarToCartesian(start);
    const large = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`;
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
      {segments.map((seg) => {
        const startAngle = (cumulative / total) * 360;
        cumulative += seg.pct;
        const endAngle = (cumulative / total) * 360;
        return (
          <path
            key={seg.label}
            d={describeArc(startAngle, endAngle)}
            fill={seg.color}
            opacity={0.85}
            className="transition-all hover:opacity-100"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={34} fill="#070e1a" />
      <text x={cx} y={cy - 2} textAnchor="middle" fill="#b8944e" fontSize="11" fontWeight="600">
        Total
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="10">
        {total}%
      </text>
    </svg>
  );
}

export default function AllocatorPage() {
  const [equity, setEquity] = useState(40);
  const [credit, setCredit] = useState(30);
  const [privateAlt, setPrivateAlt] = useState(20);
  const [result, setResult] = useState<AllocateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cash = Math.max(0, 100 - equity - credit - privateAlt);

  const totalUsed = equity + credit + privateAlt;
  const canSubmit = totalUsed <= 100;

  const handleAnalyse = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equity: Math.round(equity),
          credit: Math.round(credit),
          privateAlt: Math.round(privateAlt),
        }),
      });
      if (!resp.ok) {
        throw new Error("Failed to analyse allocation");
      }
      const data: AllocateResult = await resp.json();
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [equity, credit, privateAlt]);

  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Tools</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Allocation <span className="brass-gradient-text font-semibold">Sandbox</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            Adjust your portfolio mix across asset classes to see the implied risk score and
            receive advisor commentary. All figures are illustrative.
          </p>
        </div>
      </section>

      <section className="border-t etched-divider px-6 py-16 pattern-vault">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: Sliders */}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-amber-500/60" />
                <h2 className="text-lg font-heading font-medium text-slate-100">Adjust allocation</h2>
              </div>

              {/* Equity */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <label className="text-slate-300">Equities</label>
                  </div>
                  <span className="font-medium text-emerald-300">{equity.toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={equity}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setEquity(v);
                    setResult(null);
                  }}
                  className="mt-2 w-full"
                />
              </div>

              {/* Credit / Fixed Income */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Banknote size={14} className="text-amber-500" />
                    <label className="text-slate-300">Credit / Fixed Income</label>
                  </div>
                  <span className="font-medium text-amber-300">{credit.toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={credit}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setCredit(v);
                    setResult(null);
                  }}
                  className="mt-2 w-full"
                />
              </div>

              {/* Private / Alternatives */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-purple-400" />
                    <label className="text-slate-300">Private / Alternatives</label>
                  </div>
                  <span className="font-medium text-purple-300">{privateAlt.toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={privateAlt}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setPrivateAlt(v);
                    setResult(null);
                  }}
                  className="mt-2 w-full"
                />
              </div>

              {/* Total tracker */}
              <div className="rounded-xl border border-slate-700/50 bg-[#0c172e]/70 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Cash / Unallocated</span>
                  <span className={cash > 0 ? "text-amber-400" : "text-slate-500"}>{cash.toFixed(0)}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-purple-500 transition-all"
                    style={{ width: `${Math.min(100, totalUsed)}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] text-slate-600">
                  {totalUsed <= 100
                    ? `${totalUsed.toFixed(0)}% allocated · ${cash.toFixed(0)}% cash`
                    : `Over-allocated by ${(totalUsed - 100).toFixed(0)}% — reduce a position`}
                </p>
              </div>

              <button
                onClick={handleAnalyse}
                disabled={!canSubmit || loading}
                className="w-full brass-gradient rounded-full px-6 py-3 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Analysing…
                  </>
                ) : (
                  <>
                    <PieChart size={14} />
                    Analyse allocation
                  </>
                )}
              </button>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>

            {/* Right: Result */}
            <div>
              {result ? (
                <div className="glass-panel rounded-2xl p-8 glow-brass h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-heading font-medium text-slate-100">Portfolio Analysis</h3>
                    <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-[10px] font-medium text-amber-400">
                      {result.source === "ai" ? "AI-enhanced" : "Deterministic"}
                    </span>
                  </div>

                  {/* Donut preview */}
                  <div className="mt-6">
                    <DonutChart
                      equity={result.equity}
                      credit={result.credit}
                      privateAlt={result.privateAlt}
                      cash={result.cash}
                    />
                  </div>

                  {/* Legend */}
                  <div className="mt-4 space-y-1.5">
                    {[
                      { label: "Equities", pct: result.equity, color: "#4a7c59" },
                      { label: "Credit/Income", pct: result.credit, color: "#b8944e" },
                      { label: "Alternatives", pct: result.privateAlt, color: "#7a5ea7" },
                      { label: "Cash", pct: result.cash, color: "#6b8e9b" },
                    ]
                      .filter((s) => s.pct > 0)
                      .map((s) => (
                        <div key={s.label} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: s.color }}
                            />
                            <span className="text-slate-300">{s.label}</span>
                          </div>
                          <span className="text-slate-400">{s.pct.toFixed(0)}%</span>
                        </div>
                      ))}
                  </div>

                  {/* Risk score */}
                  <div className="mt-6 rounded-xl border border-slate-700/50 bg-[#0c172e]/70 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Risk score</span>
                      <span className="text-xl font-semibold text-amber-300">
                        {result.riskScore.toFixed(1)}
                        <span className="text-xs text-slate-500">/10</span>
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(result.riskScore / 10) * 100}%`,
                          background:
                            result.riskScore < 3
                              ? "linear-gradient(90deg, #4a7c59, #6b8e9b)"
                              : result.riskScore < 6
                              ? "linear-gradient(90deg, #b8944e, #d4b87a)"
                              : "linear-gradient(90deg, #b8944e, #c0392b)",
                        }}
                      />
                    </div>
                    <p className="mt-1 text-xs font-medium text-amber-400">{result.riskLabel}</p>
                  </div>

                  {/* Commentary */}
                  <div className="mt-4">
                    <p className="text-xs text-slate-500 mb-2">Advisor commentary</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{result.commentary}</p>
                  </div>

                  <p className="mt-6 text-[10px] text-slate-600 italic">
                    This is an illustrative analysis only. Consult your advisor for formal asset allocation.
                  </p>
                </div>
              ) : (
                <div className="glass-panel rounded-2xl p-8 glow-brass h-full flex items-center justify-center">
                  <div className="text-center">
                    <PieChart size={32} className="mx-auto text-slate-600" />
                    <p className="mt-4 text-sm text-slate-500">
                      Adjust the sliders and click{" "}
                      <span className="text-amber-400 font-medium">Analyse allocation</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      to see risk score, allocation pie chart, and advisor commentary.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Context section */}
      <section className="border-t etched-divider px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl text-slate-100">
            Why allocation matters
          </h2>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            Asset allocation determines the vast majority of portfolio variability. A well-structured
            mix aligned with your time horizon, liquidity needs, and risk tolerance is the foundation
            of enduring wealth. Our sandbox helps you explore the trade-offs before meeting with
            your advisor.
          </p>
        </div>
      </section>
    </div>
  );
}