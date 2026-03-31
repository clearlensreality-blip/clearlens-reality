"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Avatar({
  src,
  alt = "User avatar",
  size = 40,
  className,
}: {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 shadow-sm",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
          ?
        </div>
      )}
    </div>
  );
}
