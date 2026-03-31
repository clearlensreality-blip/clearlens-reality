"use client";

import { cn } from "@/lib/utils";

export default function ScanResults({
  title,
  description,
  image,
  className,
}: {
  title: string;
  description: string;
  image?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md p-6 shadow-sm",
        className
      )}
    >
      {image && (
        <img
          src={image}
          alt="Scan result"
          className="w-full h-auto rounded-lg mb-4 border border-neutral-800"
        />
      )}

      <h2 className="text-xl font-semibold text-neutral-200">{title}</h2>

      <p className="text-neutral-400 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
