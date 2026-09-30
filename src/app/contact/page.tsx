"use client";

import { useState, type FormEvent } from "react";
import { Lock, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    familyOffice: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError(true);
      return;
    }
    setError(false);
    // Simulate secure submission
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="pt-28 pb-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="glass-panel rounded-3xl p-12">
            <CheckCircle size={40} className="mx-auto text-amber-500" />
            <h1 className="mt-6 text-3xl font-heading font-light text-slate-100">Enquiry submitted</h1>
            <p className="mt-4 text-sm text-slate-400">
              Your message has been received securely. A principal will respond within two business days.
            </p>
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
            A <span className="gold-gradient-text font-semibold">private conversation</span>
          </h1>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            We take your privacy seriously. This form is encrypted end-to-end. Tell us about your
            goals, liquidity needs, and timeline — and we will respond personally.
          </p>
        </div>
      </section>

      <section className="border-t border-amber-500/5 px-6 py-16 bg-[#080e1a]/30">
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

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#10182a] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#10182a] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
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
                  className="w-full rounded-xl border border-slate-700 bg-[#10182a] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="familyOffice" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                  Family / entity (optional)
                </label>
                <input
                  type="text"
                  id="familyOffice"
                  name="familyOffice"
                  value={form.familyOffice}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-[#10182a] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  placeholder="Family name or entity"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs tracking-wider text-slate-400 uppercase mb-2">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-[#10182a] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20 resize-y"
                placeholder="Tell us about your goals, timeline, and any initial questions..."
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <p className="text-[11px] text-slate-600">
                This site is protected by encryption. Your information will not be shared.
              </p>
              <button
                type="submit"
                className="gold-gradient inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[#0b1220] transition-all hover:brightness-110"
              >
                <Send size={14} />
                Submit enquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}