"use client";

import { cn } from "@/lib/utils";

export default function HistoryItem({
  title,
  timestamp,
  icon,
  className,
  onClick,
}: {
  title: string;
  timestamp: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm shadow-sm",
        "hover:bg-neutral-800/40 transition-all cursor-pointer",
        className
      )}
    >
      {icon && (
        <div className="text-neutral-400 text-xl flex-shrink-0">
          {icon}
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-neutral-200 font-medium">{title}</span>
        <span className="text-neutral-500 text-xs">{timestamp}</span>
      </div>
    </div>
  );
}
