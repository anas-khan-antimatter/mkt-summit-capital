"use client";

import { useState } from "react";
import { TrendingUp, DollarSign } from "lucide-react";

export default function ScenarioPlanner() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [inflationRate, setInflationRate] = useState(3.0);
  const [years, setYears] = useState(10);

  // Assumed nominal return before inflation
  const nominalReturn = 7.0;
  const realReturn = nominalReturn - inflationRate;

  // Future value of monthly contributions
  const monthlyRate = realReturn / 100 / 12;
  const nMonths = years * 12;
  let fv = 0;
  if (monthlyRate > 0) {
    fv = monthlyContribution * ((Math.pow(1 + monthlyRate, nMonths) - 1) / monthlyRate);
  } else {
    fv = monthlyContribution * nMonths;
  }

  const totalContributions = monthlyContribution * nMonths;
  const growthAmount = fv - totalContributions;

  function formatCurrency(val: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  }

  return (
    <div className="glass-panel rounded-2xl p-8 glow-gold">
      <div className="flex items-center gap-3">
        <TrendingUp size={18} className="text-amber-500/70" />
        <h3 className="text-lg font-heading font-medium text-slate-100">Scenario Planner</h3>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Adjust contributions, inflation, and time horizon to see projected outcomes.
      </p>

      {/* Sliders */}
      <div className="mt-8 space-y-6">
        {/* Monthly Contribution */}
        <div>
          <div className="flex items-center justify-between text-sm">
            <label className="text-slate-400">Monthly contribution</label>
            <span className="font-medium text-amber-300">
              {formatCurrency(monthlyContribution)}
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={50000}
            step={500}
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="mt-2 w-full h-1.5 rounded-full appearance-none bg-slate-700 accent-[#c8a45c] cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#c8a45c]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-600">
            <span>$500</span>
            <span>$50,000</span>
          </div>
        </div>

        {/* Inflation Rate */}
        <div>
          <div className="flex items-center justify-between text-sm">
            <label className="text-slate-400">Assumed inflation</label>
            <span className="font-medium text-amber-300">{inflationRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="mt-2 w-full h-1.5 rounded-full appearance-none bg-slate-700 accent-[#c8a45c] cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#c8a45c]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-600">
            <span>0%</span>
            <span>10%</span>
          </div>
        </div>

        {/* Time Horizon */}
        <div>
          <div className="flex items-center justify-between text-sm">
            <label className="text-slate-400">Time horizon</label>
            <span className="font-medium text-amber-300">{years} years</span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 w-full h-1.5 rounded-full appearance-none bg-slate-700 accent-[#c8a45c] cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#c8a45c]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-600">
            <span>1 yr</span>
            <span>30 yrs</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800 bg-[#10182a]/50 p-4">
          <p className="text-[10px] tracking-wider text-slate-500 uppercase">Projected value</p>
          <p className="mt-1 text-lg font-semibold text-slate-100">{formatCurrency(fv)}</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-[#10182a]/50 p-4">
          <p className="text-[10px] tracking-wider text-slate-500 uppercase">Total contributions</p>
          <p className="mt-1 text-lg font-semibold text-slate-100">{formatCurrency(totalContributions)}</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-slate-800 bg-[#10182a]/50 p-4">
        <p className="text-[10px] tracking-wider text-slate-500 uppercase">
          Estimated real growth (after {inflationRate.toFixed(1)}% inflation)
        </p>
        <div className="mt-1 flex items-center gap-2">
          <DollarSign size={16} className="text-amber-500/70" />
          <span className={`text-lg font-semibold ${growthAmount >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {formatCurrency(growthAmount)}
          </span>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-slate-500 italic">
        Assumes {nominalReturn}% nominal return before inflation. Interactive illustration only —
        not a guarantee of future results.
      </p>
    </div>
  );
}