
"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  // Close on ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-md shadow-xl p-6 animate-fadeIn",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
