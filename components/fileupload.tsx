"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";

export default function FileUpload({
  onChange,
  className,
  label = "Upload file",
}: {
  onChange?: (file: File | null) => void;
  className?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "px-4 py-2 rounded-md border border-neutral-700 bg-neutral-900/40 text-neutral-200",
          "hover:bg-neutral-800/60 transition-all backdrop-blur-sm shadow-sm"
        )}
      >
        {label}
      </button>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
