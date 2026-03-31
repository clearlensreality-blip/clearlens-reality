"use client";

import Button from "@/components/button";

export default function SignupPage() {
  return (
    <div className="w-full space-y-20">

      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Create Account
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl">
          Join ClearLens Reality and start scanning with clarity.
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

          <Button href="#">Sign Up</Button>
        </form>
      </section>

    </div>
  );
}
