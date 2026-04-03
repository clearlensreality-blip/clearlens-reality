"use client";

import { useEffect, useRef, useState } from "react";

interface CameraModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (image: string) => void;
}

export default function CameraModal({ open, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [cameraIndex, setCameraIndex] = useState(0);

  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const initialDistanceRef = useRef<number | null>(null);
  const uiLockedRef = useRef(false);

  const zoomPresets = [0.5, 1, 2, 5]; // FINAL FIXED PRESETS

  // Device detection
  const ua = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const isDesktop = !isIOS && !isAndroid;

  // Disable background scroll + clicks + page zoom
  useEffect(() => {
    function preventPageZoom(e: TouchEvent) {
      if (e.touches.length > 1) e.preventDefault();
    }

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
      document.addEventListener("touchmove", preventPageZoom, { passive: false });
    } else {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
      document.removeEventListener("touchmove", preventPageZoom);
    }
  }, [open]);

  // Load cameras
  async function loadCameras() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    setCameras(videoDevices);
  }

  // Start camera
  async function startCamera(deviceId?: string) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId,
          width: { ideal: 3840 }, // 4K preferred
          height: { ideal: 2160 },
          aspectRatio: { ideal: 16 / 9 },
        },
      });

      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  }

  // Handle modal open
  useEffect(() => {
    if (!open) return;

    loadCameras().then(() => {
      const deviceId = cameras[cameraIndex]?.deviceId;
      startCamera(deviceId);
    });

    const video = videoRef.current;

    if (video) {
      video.addEventListener("touchstart", handleTouchStart);
      video.addEventListener("touchmove", handleTouchMove);
      video.addEventListener("touchend", handleTouchEnd);
      video.addEventListener("click", handleTapFocus);
    }

    return () => {
      stream?.getTracks().forEach((track) => track.stop());

      if (video) {
        video.removeEventListener("touchstart", handleTouchStart);
        video.removeEventListener("touchmove", handleTouchMove);
        video.removeEventListener("touchend", handleTouchEnd);
        video.removeEventListener("click", handleTapFocus);
      }
    };
  }, [open, cameraIndex, cameras.length]);

  // Capture
  function handleCapture() {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    onCapture(imageData);
    onClose();
  }

  // Switch camera
  function switchCamera() {
    if (cameras.length < 2) return;
    setCameraIndex((prev) => (prev + 1) % cameras.length);
  }

  // Pinch zoom
  function getDistance(touches: TouchList) {
    const [a, b] = [touches[0], touches[1]];
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function handleTouchStart(e: TouchEvent) {
    if (e.touches.length === 2) {
      initialDistanceRef.current = getDistance(e.touches);
      uiLockedRef.current = true;
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (e.touches.length === 2 && initialDistanceRef.current) {
      const newDistance = getDistance(e.touches);
      const scale = newDistance / initialDistanceRef.current;

      const sensitivity = isIOS ? 0.6 : isAndroid ? 1.0 : 0.4;
      const newZoom = Math.min(Math.max(0.5, zoomRef.current * (1 + (scale - 1) * sensitivity)), 5);

      setZoom(newZoom);
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${newZoom})`;
      }
    }
  }

  function handleTouchEnd() {
    zoomRef.current = zoom;
    initialDistanceRef.current = null;
    uiLockedRef.current = false;
  }

  // Tap to focus (UI only)
  function handleTapFocus(e: MouseEvent) {
    if (isDesktop) return;

    const x = e.clientX;
    const y = e.clientY;

    const focus = document.createElement("div");
    focus.style.position = "fixed";
    focus.style.left = `${x - 40}px`;
    focus.style.top = `${y - 40}px`;
    focus.style.width = "80px";
    focus.style.height = "80px";
    focus.style.borderRadius = isIOS ? "8px" : "50%";
    focus.style.border = isIOS ? "2px solid yellow" : "2px solid white";
    focus.style.opacity = "1";
    focus.style.pointerEvents = "none";
    focus.style.transition = "opacity 0.6s ease, transform 0.3s ease";
    focus.style.transform = "scale(1)";
    focus.style.zIndex = "9999";

    document.body.appendChild(focus);

    setTimeout(() => {
      focus.style.opacity = "0";
      focus.style.transform = "scale(1.3)";
    }, 50);

    setTimeout(() => {
      focus.remove();
    }, 700);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black flex flex-col justify-between z-50"
      style={{ pointerEvents: "auto" }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover transition-transform duration-75 ${
          isIOS ? "rounded-3xl" : ""
        }`}
      />

      <canvas ref={canvasRef} className="hidden" />

      {/* Flip camera */}
      <div className="absolute top-6 right-6">
        {cameras.length > 1 && (
          <button
            onClick={switchCamera}
            style={{ pointerEvents: uiLockedRef.current ? "none" : "auto" }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4v4m0-4l-5 5m-5 13H5v-4m0 4l5-5m-5-9a7 7 0 0112 0m0 8a7 7 0 01-12 0" />
            </svg>
          </button>
        )}
      </div>

      {/* Zoom presets (horizontal row) */}
      {!isDesktop && (
        <div className="absolute bottom-28 left-10 flex gap-3">
          {zoomPresets.map((z) => (
            <button
              key={z}
              onClick={() => {
                const targetZoom = Math.min(z, 5);

                if (videoRef.current) {
                  videoRef.current.style.transition = "transform 150ms ease";
                  videoRef.current.style.transform = `scale(${targetZoom})`;

                  setTimeout(() => {
                    if (videoRef.current) videoRef.current.style.transition = "";
                  }, 150);
                }

                setZoom(targetZoom);
                zoomRef.current = targetZoom;
              }}
              style={{ pointerEvents: uiLockedRef.current ? "none" : "auto" }}
              className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white"
            >
              {z}×
            </button>
          ))}
        </div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-10 left-10 flex items-center gap-6">

        {/* Cancel */}
        <button
          onClick={onClose}
          style={{ pointerEvents: uiLockedRef.current ? "none" : "auto" }}
          className="text-white text-lg bg-black/40 px-4 py-2 rounded-lg backdrop-blur-md"
        >
          Cancel
        </button>

        {/* Shutter Button */}
        <button
          onClick={handleCapture}
          style={{ pointerEvents: uiLockedRef.current ? "none" : "auto" }}
          className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 transition"
        >
          <img
            src="/your-shutter-icon.png"
            alt="shutter"
            className="w-16 h-16 opacity-90"
          />
        </button>

      </div>
    </div>
  );
}
