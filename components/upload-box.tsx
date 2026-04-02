"use client";

import { useRef } from "react";

interface UploadBoxProps {
  onUpload: (image: string) => void;
}

export default function UploadBox({ onUpload }: UploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        // This sends the exact same format as the camera:
        // "data:image/jpeg;base64,AAAA..."
        onUpload(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div
      className="border border-neutral-700 rounded-xl p-10 text-center text-gray-400 cursor-pointer hover:border-blue-500 transition"
      onClick={() => fileInputRef.current?.click()}
    >
      <p className="text-lg">Click to upload an image</p>
      <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG supported</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
