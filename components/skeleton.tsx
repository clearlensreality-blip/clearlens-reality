"use client";

import { cn } from "@/lib/utils";

export default function Skeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-800/60 rounded-md",
        className
      )}
    />
  );
}
