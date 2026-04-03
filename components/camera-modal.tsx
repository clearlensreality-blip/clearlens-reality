"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MdFlashOn,
  MdTimer,
  MdAspectRatio,
  MdSettings,
  MdCameraswitch,
  MdClose,
} from "react-icons/md";

type CameraMode = "portrait" | "photo" | "video" | "more";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: () => void; // closes modal
}

export default function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [mode, setMode] = useState<CameraMode>("photo");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [isRecording, setIsRecording] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [supportsHardwarePortrait, setSupportsHardwarePortrait] = useState(false);

  // Detect capabilities
  useEffect(() => {
    async function detectCapabilities() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasDepthCamera = devices.some((d) =>
          d.label.toLowerCase().includes("depth")
        );
        setSupportsHardwarePortrait(hasDepthCamera);
      } catch (err) {
        console.warn("Capability detection failed:", err);
      }
    }
    detectCapabilities();
  }, []);

  // Start camera
  useEffect(() => {
    if (!isOpen) return;

    async function startCamera() {
      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 },
          },
          audio: mode === "video",
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera start failed:", err);
      }
    }

    startCamera();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [isOpen, facingMode, mode]);

  // Toggle camera
  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Photo capture (no return — just close modal)
  const capturePhoto = () => {
    console.log("Photo captured");
    onCapture(); // closes modal
  };

  // Video recording
  const startRecording = () => {
    if (!streamRef.current) return;

    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm;codecs=vp9",
    });

    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      console.log("Video recorded:", blob);
      onCapture(); // close modal after recording
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // Portrait mode
  const capturePortrait = () => {
    console.log("Portrait captured");
    onCapture();
  };

  // Shutter logic
  const handleShutterPress = () => {
    if (mode === "photo") capturePhoto();
    if (mode === "portrait") capturePortrait();

    if (mode === "video") {
      if (!isRecording) startRecording();
      else stopRecording();
    }
  };

  // Tap to focus (visual only)
  const handleTapToFocus = (e: React.MouseEvent) => {
    const ring = document.createElement("div");
    ring.className =
      "absolute w-20 h-20 border-2 border-white rounded-full pointer-events-none animate-ping";
    ring.style.left = `${e.clientX - 40}px`;
    ring.style.top = `${e.clientY - 40}px`;
    ring.style.zIndex = "30";

    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 600);
  };

  // Pinch to zoom
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let initialDistance = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance = Math.sqrt(dx * dx + dy * dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDistance = Math.sqrt(dx * dx + dy * dy);

        const zoomFactor = newDistance / initialDistance;
        const newZoom = Math.min(5, Math.max(0.5, zoom * zoomFactor));
        setZoom(newZoom);
      }
    };

    video.addEventListener("touchstart", onTouchStart);
    video.addEventListener("touchmove", onTouchMove);

    return () => {
      video.removeEventListener("touchstart", onTouchStart);
      video.removeEventListener("touchmove", onTouchMove);
    };
  }, [zoom]);

  // Apply zoom to camera track
  useEffect(() => {
    const track = streamRef.current
      ?.getVideoTracks()
      ?.find((t) => {
        const caps = t.getCapabilities?.() as any;
        return caps && "zoom" in caps;
      });

    if (!track) return;

    try {
      (track as any).applyConstraints({
        advanced: [{ zoom }],
      });
    } catch (err) {
      console.warn("Zoom not supported:", err);
    }
  }, [zoom]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Click to focus
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleClick = (e: MouseEvent) => {
      handleTapToFocus(e as any);
    };

    video.addEventListener("click", handleClick);

    return () => {
      video.removeEventListener("click", handleClick);
    };
  }, []);

  // UI components
  const TopBar = () => (
    <div className="absolute top-0 left-0 w-full flex justify-between px-6 py-4 z-20 text-white">
      <MdFlashOn size={28} />
      <MdTimer size={28} />
      <MdAspectRatio size={28} />
      <MdSettings size={28} />
    </div>
  );

  const zoomLevels = [0.5, 1, 2, 5];

  const ZoomBar = () => (
    <div className="absolute bottom-40 w-full flex justify-center gap-4 z-20">
      {zoomLevels.map((level) => (
        <button
          key={level}
          onClick={() => setZoom(level)}
          className={`px-4 py-2 rounded-full text-white text-lg transition ${
            zoom === level ? "bg-white/30 backdrop-blur" : "bg-black/30"
          }`}
        >
          {level}×
        </button>
      ))}
    </div>
  );

  const modes: CameraMode[] = ["portrait", "photo", "video", "more"];

  const ModeSelector = () => (
    <div className="absolute bottom-6 w-full flex justify-center gap-8 text-white text-lg z-20">
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`uppercase tracking-wide ${
            mode === m ? "text-white font-semibold" : "text-white/50"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );

  const BottomBar = () => (
    <div className="absolute bottom-20 w-full flex justify-between items-center px-10 z-20">
      <button onClick={onClose} className="text-white">
        <MdClose size={36} />
      </button>

      <button
        onClick={handleShutterPress}
        className="w-[84px] h-[84px] rounded-full bg-white border-[6px] border-white shadow-xl active:scale-95 transition"
      />

      <button onClick={toggleCamera} className="text-white">
        <MdCameraswitch size={36} />
      </button>
    </div>
  );

  // Final render
  return isOpen ? (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />

      <TopBar />
      <ZoomBar />
      <BottomBar />
      <ModeSelector />
    </div>
  ) : null;
}
