"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cookieBannerSeen");

    if (!seen) {
      setShow(true);
      sessionStorage.setItem("cookieBannerSeen", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-4 text-center">
      <p>This site uses cookies to improve your experience.</p>
      <button
        onClick={() => setShow(false)}
        className="mt-2 px-4 py-2 bg-blue-600 rounded"
      >
        OK
      </button>
    </div>
  );
}
