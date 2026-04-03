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

  const [zoomPresets, setZoomPresets] = useState<number[]>([]);

  // Device detection
  const ua = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const isDesktop = !isIOS && !isAndroid;

  // Disable background scroll + clicks
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
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
        video: deviceId ? { deviceId } : true,
      });

      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;

      generateZoomPresets(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  }

  // Generate 5 zoom presets (hardware + fallback)
  function generateZoomPresets(mediaStream: MediaStream) {
    try {
      const track = mediaStream.getVideoTracks()[0];
      const caps: any = track.getCapabilities();

      if (caps.zoom && caps.zoom.min !== undefined) {
        const { min, max } = caps.zoom;

        const presets = [
          Number(min.toFixed(1)),
          Number((min + (max - min) * 0.25).toFixed(1)),
          Number((min + (max - min) * 0.5).toFixed(1)),
          Number((min + (max - min) * 0.75).toFixed(1)),
          Number(max.toFixed(1)),
        ];

        const unique = Array.from(new Set(presets)).sort((a, b) => a - b);

        setZoomPresets(unique);
        return;
      }
    } catch {}

    // Fallback
    if (isIOS) setZoomPresets([1, 2]);
    else if (isAndroid) setZoomPresets([0.5, 1, 2, 5]);
    else setZoomPresets([]);
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
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (e.touches.length === 2 && initialDistanceRef.current) {
      const newDistance = getDistance(e.touches);
      const scale = newDistance / initialDistanceRef.current;

      const sensitivity = isIOS ? 0.6 : isAndroid ? 1.0 : 0.4;
      const newZoom = Math.min(Math.max(1, zoomRef.current * (1 + (scale - 1) * sensitivity)), 10);

      setZoom(newZoom);
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${newZoom})`;
      }
    }
  }

  function handleTouchEnd() {
    zoomRef.current = zoom;
    initialDistanceRef.current = null;
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
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h4v4m0-4l-5 5m-5 13H5v-4m0 4l5-5m-5-9a7 7 0 0112 0m0 8a7 7 0 01-12 0" />
            </svg>
          </button>
        )}
      </div>

      {/* Zoom presets */}
      {!isDesktop && zoomPresets.length > 0 && (
        <div
          className={`absolute ${
            isIOS ? "bottom-32 left-1/2 -translate-x-1/2 flex gap-3" : "right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3"
          }`}
        >
          {zoomPresets.map((z) => (
            <button
              key={z}
              onClick={() => {
                setZoom(z);
                zoomRef.current = z;
                if (videoRef.current) videoRef.current.style.transform = `scale(${z})`;
              }}
              className={`text-white ${
                isIOS
                  ? "px-4 py-2 rounded-full bg-black/40 backdrop-blur-md"
                  : "w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center"
              }`}
            >
              {z}×
            </button>
          ))}
        </div>
      )}

      {/* Bottom controls */}
      <div className="w-full flex items-center justify-between px-10 pb-10">

        <button onClick={onClose} className="text-white text-lg bg-black/40 px-4 py-2 rounded-lg backdrop-blur-md">
          Cancel
        </button>

        <button
          onClick={handleCapture}
          className={`${
            isIOS
              ? "w-20 h-20 rounded-full border-4 border-neutral-300 bg-white/80"
              : "w-20 h-20 rounded-full bg-white"
          } active:scale-95 transition`}
        />

        <div className="w-16" />
      </div>
    </div>
  );
}
