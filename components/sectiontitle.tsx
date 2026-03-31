"use client";

import { cn } from "@/lib/utils";

export default function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold text-neutral-300 tracking-tight mb-2",
        className
      )}
    >
      {children}
    </h2>
  );
}
