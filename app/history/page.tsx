"use client";

export default function HistoryPage() {
  return (
    <div className="w-full space-y-20">

      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Scan History
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl">
          Review your previous scans and explanations.
        </p>
      </section>

      {/* HISTORY LIST */}
      <section className="w-full p-8 rounded-xl bg-gradient-to-br from-black via-neutral-900 to-blue-950 border border-blue-900/40 shadow-lg shadow-black/40">
        <p className="text-gray-400">
          No history yet. Your scans will appear here.
        </p>
      </section>

    </div>
  );
}
