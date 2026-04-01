"use client";

import Button from "@/components/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-40 space-y-20">

      {/* HERO */}
      <section className="space-y-4 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Login
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl">
          Access your ClearLens Reality account.
        </p>
      </section>

      {/* FORM */}
      <section className="w-full max-w-xl p-8 rounded-xl bg-blue-600 border border-blue-900/40 shadow-lg shadow-black/40">
        <form className="space-y-6">

          <div>
            <label className="block mb-2 text-gray-200">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-neutral-900/40 border border-neutral-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-200">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded bg-neutral-900/40 border border-neutral-700"
            />
          </div>

          {/* Full-width button fix */}
          <div className="w-full">
            <Button href="#" className="w-full">Login</Button>
          </div>

        </form>
      </section>

    </div>
  );
}
