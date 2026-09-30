import Link from "next/link";

const footerSections = [
  {
    title: "Practice",
    links: [
      { label: "Approach", href: "/approach" },
      { label: "Strategies", href: "/strategies" },
      { label: "Allocator", href: "/allocator" },
      { label: "Team", href: "/team" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "hello@summitcapital.com", href: "mailto:hello@summitcapital.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-amber-500/10 bg-[#080e1a]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="text-lg tracking-wider font-heading gold-gradient-text font-semibold">
              Summit Capital
            </span>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-500">
              Private wealth counsel for families and founders.
              Discretion, clarity, and long horizon stewardship.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[11px] font-semibold tracking-[0.2em] text-amber-600/80 uppercase">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-amber-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-800/50 pt-6 text-center">
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Summit Capital. All rights reserved.
            &nbsp;·&nbsp; For illustration only — not an offer of securities.
          </p>
        </div>
      </div>
    </footer>
  );
}