"use client";

import { cn } from "@/lib/utils";

export default function Logo({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 select-none",
        className
      )}
    >
      {/* Placeholder circle logo — replace with your actual SVG later */}
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-blue-600 shadow-md"
      />

      <span className="text-lg font-semibold text-neutral-200 tracking-tight">
        ClearLens
      </span>
    </div>
  );
}
