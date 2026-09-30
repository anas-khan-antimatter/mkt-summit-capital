import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Alexander Voss",
    title: "Managing Partner",
    bio: "Formerly CIO of a multi-family office managing $4.2B. Alexander founded Summit Capital to bring institutional rigour to private wealth counsel.",
    initials: "AV",
  },
  {
    name: "Catherine Rowe",
    title: "Partner, Portfolio Strategy",
    bio: "18 years at Goldman Sachs Asset Management. Catherine leads our investment committee and oversees all client portfolio construction.",
    initials: "CR",
  },
  {
    name: "David Okonkwo",
    title: "Partner, Tax & Estate Planning",
    bio: "Dual-qualified solicitor and CPA. David designs trust structures, succession plans, and tax-efficient strategies for multi-generational families.",
    initials: "DO",
  },
  {
    name: "Eleanor Hartley",
    title: "Principal, Private Placements",
    bio: "Previously led family-office direct investment at a $3B single-family office. Eleanor sources and diligences private market opportunities.",
    initials: "EH",
  },
  {
    name: "James Whitfield",
    title: "Principal, Client Advisory",
    bio: "15 years in wealth management at UBS and Northern Trust. James is the primary advisor for many of our longest-standing client relationships.",
    initials: "JW",
  },
  {
    name: "Sarah Chen",
    title: "Director of Research",
    bio: "PhD in Economics from LSE. Sarah produces our macro research, manager due diligence, and the proprietary risk scoring framework.",
    initials: "SC",
  },
];

export default function TeamPage() {
  return (
    <div className="pt-28 pb-24">
      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-amber-600/60 uppercase">Team</p>
          <h1 className="mt-4 text-4xl font-heading font-light tracking-tight md:text-5xl">
            Principals you <span className="brass-gradient-text font-semibold">work with</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-400 leading-relaxed">
            We are a lean partnership. Every client is managed by a senior principal with direct
            access to the entire investment committee.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="border-t border-amber-500/5 px-6 py-16">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((person) => (
            <div
              key={person.name}
              className="glass-panel rounded-2xl p-7 glow-gold transition-all duration-500 hover:border-amber-500/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-500/20 bg-[#10182a] text-sm font-semibold tracking-wide text-amber-400">
                {person.initials}
              </div>
              <h2 className="mt-5 text-lg font-heading font-medium text-slate-100">{person.name}</h2>
              <p className="mt-1 text-xs tracking-[0.1em] text-amber-600/70 uppercase">{person.title}</p>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-amber-500/5 px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-2xl font-heading font-light tracking-tight md:text-3xl">
            Meet the right principal for you
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 brass-gradient rounded-full px-7 py-3 text-sm font-semibold text-[#070e1a] transition-all hover:brightness-110"
          >
            Request an introduction
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}