"use client";

import { useState } from "react";
import { Shield, TrendingUp, LineChart } from "lucide-react";

interface Answer {
  id: string;
  label: string;
  score: number;
}

const questions = [
  {
    id: "q1",
    question: "How would you describe your investment time horizon?",
    answers: [
      { id: "a1", label: "Less than 1 year", score: 1 },
      { id: "a2", label: "1–3 years", score: 2 },
      { id: "a3", label: "3–7 years", score: 3 },
      { id: "a4", label: "7–15 years", score: 4 },
      { id: "a5", label: "15+ years", score: 5 },
    ],
  },
  {
    id: "q2",
    question: "If your portfolio fell 20% in a quarter, what would you do?",
    answers: [
      { id: "b1", label: "Sell everything immediately", score: 1 },
      { id: "b2", label: "Sell a portion to reduce risk", score: 2 },
      { id: "b3", label: "Hold and wait for recovery", score: 3 },
      { id: "b4", label: "Buy more at the lower prices", score: 4 },
      { id: "b5", label: "Increase allocation aggressively", score: 5 },
    ],
  },
  {
    id: "q3",
    question: "What is your primary investment objective?",
    answers: [
      { id: "c1", label: "Capital preservation above all", score: 1 },
      { id: "c2", label: "Income generation with low volatility", score: 2 },
      { id: "c3", label: "Balanced growth and income", score: 3 },
      { id: "c4", label: "Long-term capital appreciation", score: 4 },
      { id: "c5", label: "Maximum growth, willing to accept significant volatility", score: 5 },
    ],
  },
  {
    id: "q4",
    question: "What percentage of your net worth is already committed to investments?",
    answers: [
      { id: "d1", label: "Under 10%", score: 1 },
      { id: "d2", label: "10–25%", score: 2 },
      { id: "d3", label: "25–50%", score: 3 },
      { id: "d4", label: "50–75%", score: 4 },
      { id: "d5", label: "Over 75%", score: 5 },
    ],
  },
];

type ProfileKey = "conservative" | "moderate" | "balanced" | "growth" | "aggressive";

interface AllocationProfile {
  label: string;
  color: string;
  allocation: { label: string; pct: number; color: string }[];
}

const profiles: Record<ProfileKey, AllocationProfile> = {
  conservative: {
    label: "Conservative",
    color: "text-emerald-400",
    allocation: [
      { label: "Fixed Income", pct: 55, color: "#c8a45c" },
      { label: "Equities", pct: 15, color: "#4a7c59" },
      { label: "Cash & Equiv.", pct: 20, color: "#6b8e9b" },
      { label: "Alternatives", pct: 10, color: "#8b6f9e" },
    ],
  },
  moderate: {
    label: "Moderate",
    color: "text-blue-400",
    allocation: [
      { label: "Fixed Income", pct: 40, color: "#c8a45c" },
      { label: "Equities", pct: 30, color: "#4a7c59" },
      { label: "Cash & Equiv.", pct: 10, color: "#6b8e9b" },
      { label: "Alternatives", pct: 20, color: "#8b6f9e" },
    ],
  },
  balanced: {
    label: "Balanced",
    color: "text-amber-400",
    allocation: [
      { label: "Equities", pct: 45, color: "#4a7c59" },
      { label: "Fixed Income", pct: 30, color: "#c8a45c" },
      { label: "Alternatives", pct: 20, color: "#8b6f9e" },
      { label: "Cash & Equiv.", pct: 5, color: "#6b8e9b" },
    ],
  },
  growth: {
    label: "Growth",
    color: "text-orange-400",
    allocation: [
      { label: "Equities", pct: 60, color: "#4a7c59" },
      { label: "Alternatives", pct: 25, color: "#8b6f9e" },
      { label: "Fixed Income", pct: 10, color: "#c8a45c" },
      { label: "Cash & Equiv.", pct: 5, color: "#6b8e9b" },
    ],
  },
  aggressive: {
    label: "Aggressive Growth",
    color: "text-red-400",
    allocation: [
      { label: "Equities", pct: 70, color: "#4a7c59" },
      { label: "Alternatives", pct: 25, color: "#8b6f9e" },
      { label: "Cash & Equiv.", pct: 5, color: "#6b8e9b" },
    ],
  },
};

function getProfile(score: number): ProfileKey {
  if (score <= 8) return "conservative";
  if (score <= 11) return "moderate";
  if (score <= 14) return "balanced";
  if (score <= 17) return "growth";
  return "aggressive";
}

function PieChart({ allocation }: { allocation: { label: string; pct: number; color: string }[] }) {
  const total = allocation.reduce((sum, a) => sum + a.pct, 0);
  let cumulative = 0;
  const segments = allocation.map((a) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += a.pct;
    const endAngle = (cumulative / total) * 360;
    return { ...a, startAngle, endAngle };
  });

  const radius = 80;
  const cx = 100;
  const cy = 100;

  function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(cx: number, cy: number, r: number, start: number, end: number) {
    const startP = polarToCartesian(cx, cy, r, end);
    const endP = polarToCartesian(cx, cy, r, start);
    const large = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${startP.x} ${startP.y} A ${r} ${r} 0 ${large} 0 ${endP.x} ${endP.y} Z`;
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
      {segments.map((seg) => (
        <path
          key={seg.label}
          d={describeArc(cx, cy, radius, seg.startAngle, seg.endAngle)}
          fill={seg.color}
          opacity={0.85}
          className="transition-all hover:opacity-100"
        />
      ))}
      {/* Center hole for donut effect */}
      <circle cx={cx} cy={cy} r={35} fill="#0b1220" />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#c8a45c" fontSize="11" fontWeight="600">
        Total
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="10">
        {total}%
      </text>
    </svg>
  );
}

export default function RiskQuestionnaire() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);
  const profile = allAnswered ? getProfile(totalScore) : null;
  const profileData = profile ? profiles[profile] : null;

  function handleSelect(questionId: string, score: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }

  function handleReset() {
    setAnswers({});
    setCompleted(false);
  }

  return (
    <div className="glass-panel rounded-2xl p-8 glow-gold">
      <div className="flex items-center gap-3">
        <Shield size={18} className="text-amber-500/70" />
        <h3 className="text-lg font-heading font-medium text-slate-100">Risk Questionnaire</h3>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Answer four quick questions to see a suggested allocation profile.
      </p>

      {!completed && (
        <div className="mt-6 space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <p className="text-sm font-medium text-slate-200">{q.question}</p>
              <div className="mt-2 space-y-1.5">
                {q.answers.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(q.id, a.score)}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-all ${
                      answers[q.id] === a.score
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                        : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => allAnswered && setCompleted(true)}
            disabled={!allAnswered}
            className="w-full rounded-full brass-gradient px-5 py-2.5 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            See my profile
          </button>
        </div>
      )}

      {completed && profileData && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold ${profileData.color}`}>
              {profileData.label}
            </span>
            <span className="text-xs text-slate-500">Score: {totalScore}/20</span>
          </div>

          <div className="mt-4 flex justify-center">
            <PieChart allocation={profileData.allocation} />
          </div>

          <div className="mt-4 space-y-2">
            {profileData.allocation.map((a) => (
              <div key={a.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                  <span className="text-slate-300">{a.label}</span>
                </div>
                <span className="text-slate-400">{a.pct}%</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] text-slate-500 italic">
            This is an illustrative profile only. Your advisor will build a formal risk assessment.
          </p>

          <button
            onClick={handleReset}
            className="mt-4 w-full rounded-full border border-slate-700 px-5 py-2 text-xs text-slate-400 hover:border-slate-600 hover:text-slate-300"
          >
            Retake questionnaire
          </button>
        </div>
      )}
    </div>
  );
}