"use client";

import { cn } from "@/lib/utils";

export default function Footer({
  className,
}: {
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "w-full py-6 text-center text-sm text-neutral-500 border-t border-neutral-800 bg-neutral-900/40 backdrop-blur-sm",
        className
      )}
    >
      <p>© {new Date().getFullYear()} ClearLens Reality</p>
    </footer>
  );
}
