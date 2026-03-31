"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Tooltip({
  children,
  text,
  className,
}: {
  children: React.ReactNode;
  text: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -top-10 px-3 py-1 rounded-md text-xs text-neutral-200 bg-neutral-800 border border-neutral-700 shadow-lg whitespace-nowrap z-50",
            className
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
}

