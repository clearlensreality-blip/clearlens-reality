"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-48">
      <section className="space-y-4 text-center mb-24">
        <h1 className="text-5xl font-bold leading-normal pb-1 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Login
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl">
          Access your ClearLens Reality account.
        </p>
      </section>

      <section className="w-full max-w-xl p-8 rounded-xl bg-blue-600 border border-blue-900/40 shadow-lg shadow-black/40">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/register"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              card:
                "bg-neutral-900/40 border border-neutral-700 shadow-xl rounded-xl p-6",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "bg-blue-600 hover:bg-blue-700 text-white border-none",
              formFieldInput:
                "bg-neutral-900/40 border border-neutral-700 text-white",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg",
              footer: "hidden",
              formFieldLabel: "text-gray-200",
              formFieldError: "text-red-300",
            },
          }}
        />
      </section>
    </div>
  );
}
