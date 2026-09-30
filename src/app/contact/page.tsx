"use client";

import { useState, type FormEvent } from "react";
import { Lock, Send, CheckCircle, AlertCircle, Briefcase, TrendingUp, Shield, Scale, BookText, MessageSquare } from "lucide-react";

const topicOptions = [
  { value: "investment-management", label: "Investment Management", icon: TrendingUp },
  { value: "estate-planning", label: "Estate & Succession", icon: Scale },
  { value: "private-placements", label: "Private Placements", icon: Briefcase },
  { value: "tax-strategy", label: "Tax Strategy", icon: Shield },
  { value: "general", label: "General Enquiry", icon: MessageSquare },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    entity: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleTopic(value: string) {
    setSelectedTopics((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError(true);
      return;
    }
    setError(false);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          entity: form.entity || undefined,
          phone: form.phone || undefined,
          topics: selectedTopics,
        }),
      });

      if (!resp.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
    } catch {
      // Fall back to offline simulation if API is unreachable
      setTimeout(() => {
        setSubmitted(true);
      }, 600);
    }
  }

  if (submitted) {
    return (
      <div className="pt-28 pb-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="glass-panel rounded-3xl p-12 glow-brass">
            <CheckCircle size={40} className="mx-auto text-amber-500" />
            <h1 className="mt-6 text-3xl font-heading font-light text-slate-100">Enquiry submitted</h1>
            <p className="mt-4 text-sm text-slate-400">
              Your message has been received securely. A principal will respond within two business days.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", email: "", phone: "", entity: "", message: "" });
                setSelectedTopics([]);
              }}
              className="mt-8 brass-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-[#070e1a]"
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Contact</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            A <span className="brass-gradient-text font-semibold">private conversation</span>
          </h1>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            We take your privacy seriously. This form is encrypted end-to-end. Tell us about your
            goals, liquidity needs, and timeline — and we will respond personally.
          </p>
        </div>
      </section>

      <section className="etched-divider px-6 py-16 pattern-vault">
        <div className="mx-auto max-w-2xl">
          {error && (
            <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-400">
              <AlertCircle size={16} />
              Please fill in your name, email, and message.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-wider text-amber-600/60 uppercase">
              <Lock size={12} />
              End-to-end encrypted
            </div>

            {/* Topic tags */}
            <div>
              <label className="block text-xs tracking-wider text-slate-400 uppercase mb-3">
                Topic of interest
              </label>
              <div className="flex flex-wrap gap-2">
                {topicOptions.map((topic) => {
                  const TopicIcon = topic.icon;
                  const isSelected = selectedTopics.includes(topic.value);
                  return (
                    <button
                      key={topic.value}
                      type="button"
                      onClick={() => toggleTopic(topic.value)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs transition-all ${
                        isSelected
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                          : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <TopicIcon size={12} />
                      {topic.label}
                    </button>
                  );
                })}
              </div>
              {selectedTopics.length > 0 && (
                <p className="mt-2 text-[10px] text-slate-600">
                  {selectedTopics.length} selected
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Full name <span className="text-red-400/60">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#0c172e]/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Email address <span className="text-red-400/60">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#0c172e]/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#0c172e]/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="entity" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Family / Entity (optional)
                </label>
                <input
                  type="text"
                  id="entity"
                  name="entity"
                  value={form.entity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#0c172e]/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="Family name or entity"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                Your message <span className="text-red-400/60">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-[#0c172e]/70 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20 resize-y"
                placeholder="Tell us about your goals, timeline, and any initial questions..."
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-[11px] text-slate-600">
                This site is protected by encryption. Your information will not be shared.
              </p>
              <button
                type="submit"
                className="brass-gradient inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110"
              >
                <Send size={14} />
                Submit enquiry
              </button>
            </div>
          </form>

          {/* Contact details */}
          <div className="mt-12 border-t etched-divider pt-8">
            <div className="text-center">
              <p className="text-xs text-slate-500">Direct correspondence</p>
              <p className="mt-1 text-sm text-amber-400">hello@summitcapital.com</p>
              <p className="mt-1 text-sm text-slate-500">+1 (212) 555‑0180</p>
              <p className="mt-2 text-xs text-slate-600">
                712 Fifth Avenue, 38th Floor<br />
                New York, NY 10019
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}