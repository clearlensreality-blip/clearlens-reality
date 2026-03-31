"use client";

import { cn } from "@/lib/utils";

export default function Toast({
  message,
  type = "info",
  className,
}: {
  message: string;
  type?: "info" | "success" | "error";
  className?: string;
}) {
  const colors = {
    info: "bg-blue-600/20 text-blue-300 border-blue-700",
    success: "bg-green-600/20 text-green-300 border-green-700",
    error: "bg-red-600/20 text-red-300 border-red-700",
  };

  return (
    <div
      className={cn(
        "px-4 py-2 rounded-md border shadow-md backdrop-blur-md",
        colors[type],
        className
      )}
    >
      {message}
    </div>
  );
}
