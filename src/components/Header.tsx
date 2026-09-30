"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/approach", label: "Approach" },
  { href: "/strategies", label: "Strategies" },
  { href: "/allocator", label: "Allocator" },
  { href: "/glossary", label: "Glossary" },
  { href: "/team", label: "Team" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="navy-gradient border-b border-amber-500/10">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl tracking-wider font-heading gold-gradient-text font-semibold">
              Summit Capital
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-amber-600/50 sm:block">
              Private Wealth
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-slate-300 transition-colors hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full border border-amber-500/30 px-5 py-2 text-xs font-medium tracking-wider text-amber-400 uppercase transition-all hover:border-amber-400 hover:bg-amber-500/10"
            >
              Request conversation
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="text-slate-300 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-amber-500/10 bg-[#0b1220]/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 px-6 pb-6 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm tracking-wide text-slate-300 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-amber-500/30 px-5 py-3 text-center text-sm font-medium tracking-wider text-amber-400 uppercase transition-all hover:border-amber-400 hover:bg-amber-500/10"
            >
              Request conversation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}