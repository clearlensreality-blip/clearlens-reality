"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full h-20 px-6 md:px-14 flex items-center justify-between fixed top-0 left-0 z-50 bg-transparent shadow-lg shadow-black/30">

      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="cursor-pointer">
          <Image
            src="/logo.png"
            alt="ClearLens Reality Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </a>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="/scan"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
        >
          Scan
        </a>

        <a
          href="/history"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
        >
          History
        </a>

        <a
          href="/dashboard"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
        >
          Dashboard
        </a>

        <a
          href="/about"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
        >
          About
        </a>

        <a
          href="/contact"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
        >
          Contact Us
        </a>

        <a
          href="/login"
          className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all shadow-md"
        >
          Log In
        </a>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center gap-4 py-6 md:hidden">

          <a
            href="/scan"
            className="w-3/4 text-center px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
          >
            Scan
          </a>

          <a
            href="/history"
            className="w-3/4 text-center px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
          >
            History
          </a>

          <a
            href="/dashboard"
            className="w-3/4 text-center px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
          >
            Dashboard
          </a>

          <a
            href="/about"
            className="w-3/4 text-center px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
          >
            About
          </a>

          <a
            href="/contact"
            className="w-3/4 text-center px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
          >
            Contact Us
          </a>

          <a
            href="/login"
            className="w-3/4 text-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all shadow-md"
          >
            Log In
          </a>

        </div>
      )}
    </nav>
  );
}
