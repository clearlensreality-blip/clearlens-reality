"use client";

import { cn } from "@/lib/utils";

export default function EmptyState({
  title = "Nothing here yet",
  description = "This section is currently empty.",
  icon,
  className,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4 rounded-xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md shadow-inner",
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-neutral-400 text-4xl">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold text-neutral-200">
        {title}
      </h3>

      <p className="text-neutral-400 text-sm mt-1 max-w-sm">
        {description}
      </p>
    </div>
  );
}
