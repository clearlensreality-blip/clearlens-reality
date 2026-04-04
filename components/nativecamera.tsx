"use client";

import { useRef } from "react";

export default function NativeCamera({
  onCapture,
}: {
  onCapture: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onCapture(file);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />

      <button
        onClick={openCamera}
        className="relative w-[70px] h-[70px] flex items-center justify-center"
      >
        <div className="absolute w-[70px] h-[70px] rounded-full border-[4px] border-white/40" />
        <div className="absolute w-[58px] h-[58px] rounded-full bg-white active:scale-95 transition-transform" />
      </button>
    </>
  );
}
