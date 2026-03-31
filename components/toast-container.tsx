"use client";

import { useEffect, useState } from "react";
import Toast from "./toast";

export type ToastMessage = {
  id: string;
  message: string;
  type?: "info" | "success" | "error";
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Expose a global event for triggering toasts
  useEffect(() => {
    const handler = (e: CustomEvent<ToastMessage>) => {
      setToasts((prev) => [...prev, e.detail]);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== e.detail.id));
      }, 3000);
    };

    window.addEventListener("cr-toast", handler as EventListener);
    return () =>
      window.removeEventListener("cr-toast", handler as EventListener);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
}
