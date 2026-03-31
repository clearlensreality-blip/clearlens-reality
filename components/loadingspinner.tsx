"use client";

import { cn } from "@/lib/utils";

export default function LoadingSpinner({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-neutral-700 border-t-blue-500",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
