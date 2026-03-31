"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md font-medium transition shadow-md " +
    "bg-gradient-to-br from-blue-600 via-blue-700 to-black " +
    "hover:from-blue-500 hover:via-blue-600 hover:to-black " +
    "text-white border border-blue-800/40 backdrop-blur-sm";

  if (href) {
    return (
      <Link href={href} className={cn(base, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cn(base, className)}>
      {children}
    </button>
  );
}
