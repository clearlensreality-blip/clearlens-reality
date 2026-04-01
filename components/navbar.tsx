import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full h-20 px-14 flex items-center justify-between fixed top-0 left-0 z-50 bg-transparent shadow-lg shadow-black/30">
      
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="ClearLens Reality Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Black Buttons */}
      <div className="flex items-center gap-6">
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

        {/* NEW: About */}
        <a
          href="/about"
          className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-900 transition-all shadow-md"
        >
          About
        </a>

        {/* NEW: Contact Us */}
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
    </nav>
  );
}
