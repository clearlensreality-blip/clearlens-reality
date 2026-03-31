"use client";

import { cn } from "@/lib/utils";

export default function ProgressBar({
  value,
  className,
}: {
  value: number; // 0–100
  className?: string;
}) {
  return (
    <div className={cn("w-full h-2 bg-neutral-800 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-blue-600 transition-all"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
