"use client";

import { useState } from "react";
import NativeCamera from "@/components/nativecamera";
import CameraPreview from "@/components/camerapreview";

export default function ScanPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleCapture = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleUsePhoto = () => {
    console.log("Use this photo:", preview);
    // TODO: send to backend / AI / upload etc.
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-end pb-16">
      {/* Preview overlay */}
      {preview && (
        <CameraPreview
          image={preview}
          onRetake={() => setPreview(null)}
          onUse={handleUsePhoto}
        />
      )}

      {/* Bottom gradient for contrast */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Native camera trigger */}
      <NativeCamera onCapture={handleCapture} />
    </div>
  );
}
