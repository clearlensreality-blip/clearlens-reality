"use client";

import { cn } from "@/lib/utils";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm shadow-sm",
        className
      )}
    >
      <FiSearch className="text-neutral-500 text-lg" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-neutral-200 placeholder-neutral-500 w-full text-sm"
      />
    </div>
  );
}
