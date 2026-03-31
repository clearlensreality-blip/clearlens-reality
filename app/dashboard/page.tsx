"use client";

import Button from "@/components/button";

export default function DashboardPage() {
  return (
    <div className="w-full space-y-20">

      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl">
          Welcome back. Your tools, scans, and insights are ready when you are.
        </p>
      </section>

      {/* QUICK ACTIONS */}
      <section className="w-full p-8 rounded-xl bg-gradient-to-br from-black via-neutral-900 to-blue-950 border border-blue-900/40 shadow-lg shadow-black/40 space-y-6">
        <h2 className="text-3xl font-semibold">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Button href="/scan">Start a Scan</Button>
          <Button href="/history">View History</Button>
        </div>
      </section>

    </div>
  );
}
