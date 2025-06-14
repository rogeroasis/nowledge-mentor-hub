
import React from "react";

const navLinks = [
  { label: "About us", href: "#" },
  { label: "Our mentors", href: "#" },
  { label: "Blog", href: "#" },
  { label: "FAQs", href: "#" },
];

const Header = () => (
  <header className="w-full px-8 py-4 border-b border-black flex items-center justify-between bg-white z-50 sticky top-0">
    <div className="flex items-center gap-10">
      <span className="text-3xl font-extrabold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
        NOWLEDGE
      </span>
      <nav className="hidden md:flex gap-7 text-base font-medium text-black">
        {navLinks.map(link => (
          <a key={link.label} href={link.href} className="hover:underline underline-offset-4 transition">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
    <a
      href="#"
      className="ml-auto px-6 py-2 rounded font-bold text-base bg-black text-white shadow-[3px_3px_0_0_#000] hover:shadow-none transition focus:outline-none"
      style={{ letterSpacing: "-0.03em" }}
    >
      ACCESS
    </a>
  </header>
);

export default Header;
