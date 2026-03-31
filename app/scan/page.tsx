"use client";

import Button from "@/components/button";

export default function ScanPage() {
  return (
    <div className="w-full space-y-20">

      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Start a Scan
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl">
          Upload an image or use your camera to get instant clarity.
        </p>
      </section>

      {/* SCAN PANEL */}
      <section className="w-full p-8 rounded-xl bg-gradient-to-br from-black via-neutral-900 to-blue-950 border border-blue-900/40 shadow-lg shadow-black/40 space-y-6">

        <div className="border border-neutral-700 rounded-xl p-10 text-center text-gray-400">
          Upload area placeholder — your scan UI goes here.
        </div>

        <Button href="#">Use Camera</Button>
      </section>

    </div>
  );
}
