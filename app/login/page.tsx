"use client";

import Button from "@/components/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center space-y-20">

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
      <section className="w-full p-8 rounded-xl bg-gradient-to-br from-black via-neutral-900 to-blue-950 border border-blue-900/40 shadow-lg shadow-black/40 max-w-xl">
        <form className="space-y-6">

          <div>
            <label className="block mb-2 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700"
            />
          </div>

          <Button href="#">Login</Button>
        </form>
      </section>

    </div>
  );
}
