"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    // Correctly typed form reference
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    if (res.ok) {
      setStatus("Message sent!");
      form.reset(); // Correctly typed reset()
    } else {
      setStatus("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-40">
      <h1 className="text-5xl font-bold mb-10">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 bg-blue-600 p-8 rounded-xl border border-blue-900/40 shadow-lg shadow-black/40"
      >
        <div>
          <label className="block mb-2 text-gray-200">Name</label>
          <input
            name="name"
            required
            className="w-full p-3 rounded bg-neutral-900/40 border border-neutral-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-200">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full p-3 rounded bg-neutral-900/40 border border-neutral-700"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-200">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full p-3 rounded bg-neutral-900/40 border border-neutral-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 transition p-3 rounded text-white font-semibold"
        >
          Send Message
        </button>

        <p className="text-center text-gray-200">{status}</p>
      </form>
    </div>
  );
}
