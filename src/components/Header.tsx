
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Find mentors", href: "/mentors" },
  { label: "Browse tasks", href: "/tasks" },
  { label: "About us", href: "/about" },
  { label: "Our mentors", href: "#mentors" },
  { label: "Blog", href: "#" },
  { label: "FAQs", href: "#" },
];

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full px-8 py-4 border-b border-black flex items-center justify-between bg-white z-50 sticky top-0">
      <div className="flex items-center gap-10">
        <a href="/" className="text-3xl font-extrabold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
          NOWLEDGE
        </a>
        <nav className="hidden md:flex gap-7 text-base font-medium text-black">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="hover:underline underline-offset-4 transition">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <a
        href={user ? "/dashboard" : "/auth"}
        className="ml-auto px-6 py-2 rounded font-bold text-base bg-black text-white shadow-[3px_3px_0_0_#000] hover:shadow-none transition focus:outline-none"
        style={{ letterSpacing: "-0.03em" }}
      >
        {user ? "DASHBOARD" : "ACCESS"}
      </a>
    </header>
  );
};

export default Header;
