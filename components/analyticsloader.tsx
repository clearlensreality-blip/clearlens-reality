"use client";

import { useEffect } from "react";

export default function AnalyticsLoader() {
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (consent === "accepted") {
      // Load Google Analytics script
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=YOUR_ID";
      script.async = true;
      document.head.appendChild(script);

      // Initialise dataLayer
      (window as any).dataLayer = (window as any).dataLayer || [];

      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }

      gtag("js", new Date());
      gtag("config", "YOUR_ID");
    }
  }, []);

  return null;
}
