"use client";

export default function ScanningOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse opacity-40" />

      {/* Scan Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-500 shadow-[0_0_20px_4px_rgba(0,150,255,0.8)] animate-scan" />
    </div>
  );
}
