"use client";

import { cn } from "@/lib/utils";

export default function Sidebar({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "h-full w-64 border-r border-neutral-800 bg-neutral-900/40 backdrop-blur-md p-4 flex flex-col gap-4",
        className
      )}
    >
      {children}
    </aside>
  );
}
