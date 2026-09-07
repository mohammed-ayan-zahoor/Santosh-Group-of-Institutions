"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Institutions", href: "/institutions" },
    { name: "Academics", href: "/academics" },
    { name: "Campus Life", href: "/campus-life" },
    { name: "Student Life", href: "/student-life" },
    { name: "Admissions", href: "/admissions" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-taupe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Seal & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/sgi-logo.png"
              alt="Santosh Group of Institutions"
              width={48}
              height={48}
              className="w-12 h-12 object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <div>
              <span className="block font-serif text-lg sm:text-xl font-medium tracking-tight text-charcoal leading-none">
                Santosh Group
              </span>
              <span className="block text-[11px] font-sans tracking-wider uppercase text-muted mt-0.5">
                Of Institutions • Est. 1977
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] tracking-wide font-sans transition-colors relative py-1 ${
                    active
                      ? "text-charcoal font-semibold border-b-2 border-charcoal"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Nav CTA button matching reference */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admissions"
              className="btn-primary text-xs py-2 px-4 font-semibold"
            >
              <span>Apply Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/admissions"
              className="btn-pill-nav text-xs py-1.5 px-3"
            >
              Apply
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-charcoal focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-cream border-b border-taupe px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-sm font-sans ${
                  active
                    ? "font-semibold text-charcoal bg-tint/60 rounded"
                    : "text-muted hover:text-charcoal hover:bg-tint/30 rounded"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 px-3">
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="text-xs text-muted underline block pt-2"
            >
              Staff / Admin CMS Login →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
