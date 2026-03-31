"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md bg-neutral-900/40 border border-neutral-800 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 shadow-sm backdrop-blur-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600/40",
        "transition-all",
        className
      )}
      {...props}
    />
  );
}
