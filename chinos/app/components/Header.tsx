"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLeft = ["Menu", "About", "Locations"];
const navRight = ["Events", "Contact", "Order"];
const allLinks = [...navLeft, ...navRight];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-10 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-red-deep)]/97 backdrop-blur-md shadow-[0_2px_40px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-20 flex items-center justify-between gap-8">

          {/* Left links (set to hidden on mobile) */}
          <div className="hidden md:flex gap-10 flex-1">
            {navLeft.map((link) => (
              <a
                key={link}
                href="#"
                className="font-[var(--font-montserrat)] font-normal text-[0.8rem] tracking-[0.2em] uppercase text-[var(--color-cream)] opacity-85 hover:opacity-100 transition-opacity whitespace-nowrap no-underline"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Center */}
          <div className="flex-shrink-0 flex items-center justify-center md:mx-0 mx-auto">
            <Link href="/" className="font-[var(--font-montserrat)] font-bold text-[1rem] tracking-[0.25em] uppercase text-[var(--color-cream)] no-underline">
                CHINOSS
            </Link>
          </div>

          {/* Right links (also set to hidden on mobile) */}
          <div className="hidden md:flex gap-10 flex-1 justify-end">
            {navRight.map((link) => (
              <a
                key={link}
                href="#"
                className="font-[var(--font-montserrat)] font-normal text-[0.8rem] tracking-[0.2em] uppercase text-[var(--color-cream)] opacity-85 hover:opacity-100 transition-opacity whitespace-nowrap no-underline"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Burger (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1 bg-transparent border-none"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-cream)] transition-all duration-300 origin-center ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-cream)] transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[var(--color-cream)] transition-all duration-300 origin-center ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>

        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/50 z-[190] transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--color-red-deep)] z-[200] flex flex-col pt-24 px-10 pb-12 gap-1 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 bg-transparent border-none text-[var(--color-cream)] text-2xl cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>

        {allLinks.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setMenuOpen(false)}
            className="font-[var(--font-montserrat)] text-[1.6rem] font-normal text-[var(--color-cream)] no-underline py-3 border-b border-[rgba(245,236,215,0.1)] opacity-90 hover:opacity-100 hover:pl-2 transition-all duration-200"
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
}