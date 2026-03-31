"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AlertVariant = "info" | "success" | "warning" | "error";

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-blue-900/30 border-blue-700 text-blue-200",
  success: "bg-green-900/30 border-green-700 text-green-200",
  warning: "bg-yellow-900/30 border-yellow-700 text-yellow-200",
  error: "bg-red-900/30 border-red-700 text-red-200",
};

export default function Alert({
  variant = "info",
  children,
}: {
  variant?: AlertVariant;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-lg border px-4 py-3 text-sm shadow-md backdrop-blur-sm transition-all",
        variantStyles[variant]
      )}
    >
      {children}
    </div>
  );
}
