"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export default function Toggle({ checked, onChange, className }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative w-12 h-6 rounded-full transition-colors duration-200",
        checked ? "bg-blue-600" : "bg-neutral-700",
        className
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200",
          checked && "translate-x-6"
        )}
      />
    </button>
  );
}
