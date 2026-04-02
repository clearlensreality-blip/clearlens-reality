"use client";

import { useState } from "react";
import Button from "@/components/button";
import CameraModal from "@/components/camera-modal";
import ResultsPanel from "@/components/results-panel";
import UploadBox from "@/components/upload-box";

export default function ScanPage() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  async function handleImageCapture(img: string) {
    setCapturedImage(img);
    setLoading(true);
    setResults(null);

    try {
      // Extract base64 + mime type
      const [header, base64] = img.split(",");
      const mimeType = header.match(/data:(.*);base64/)?.[1] || "image/jpeg";

      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mimeType }),
      });

      const data = await res.json();

      setResults({
        part: "AI Analysis",
        confidence: 100,
        steps: [data.result || "No description generated."],
      });
    } catch (err) {
      console.error(err);
      setResults({
        part: "Error",
        confidence: 0,
        steps: ["Failed to scan image"],
      });
    }

    setLoading(false);
  }

  function resetScan() {
    setCapturedImage(null);
    setResults(null);
    setLoading(false);
  }

  return (
    <div className="w-full space-y-20">

      {/* HERO */}
      <section className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Start a Scan
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl">
          Upload an image or use your camera to get instant clarity.
        </p>
      </section>

      {/* SCAN PANEL */}
      <section className="w-full p-8 rounded-xl bg-gradient-to-br from-black via-neutral-900 to-blue-950 border border-blue-900/40 shadow-lg shadow-black/40 space-y-8">

        {!capturedImage && !loading && !results && (
          <UploadBox onUpload={handleImageCapture} />
        )}

        {(capturedImage || loading || results) && (
          <ResultsPanel
            image={capturedImage}
            loading={loading}
            results={results}
          />
        )}

        <div className="flex gap-4">
          <Button onClick={() => setCameraOpen(true)} className="flex-1">
            Use Camera
          </Button>

          {(capturedImage || results) && (
            <Button onClick={resetScan} className="flex-1 bg-neutral-700 hover:bg-neutral-600">
              Rescan
            </Button>
          )}
        </div>
      </section>

      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleImageCapture}
      />
    </div>
  );
}
