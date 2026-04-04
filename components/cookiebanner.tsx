"use client";

import { useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  function acceptCookies() {
    // You can add logic here if needed
    setVisible(false);
  }

  function declineCookies() {
    // You can add logic here if needed
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-neutral-900 border border-neutral-700 text-white p-4 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-4 z-[9999]">
      <p className="text-sm text-gray-300 flex-1">
        We use cookies to improve your experience and analyse usage. You can either accept or decline.
      </p>

      <div className="flex gap-2">
        <button
          onClick={declineCookies}
          className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium"
        >
          Decline
        </button>

        <button
          onClick={acceptCookies}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
