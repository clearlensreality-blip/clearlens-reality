"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "p-6 w-full",
        "bg-transparent border-none shadow-none",
        className
      )}
    >
      {children}
    </div>
  );
}
