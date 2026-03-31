"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error";

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-neutral-800/60 text-neutral-200 border-neutral-700",
  success:
    "bg-green-900/40 text-green-200 border-green-700",
  warning:
    "bg-yellow-900/40 text-yellow-200 border-yellow-700",
  error:
    "bg-red-900/40 text-red-200 border-red-700",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border backdrop-blur-sm shadow-sm",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
