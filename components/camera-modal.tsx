"use client";

import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import {
  MdFlashOn,
  MdFlashOff,
  MdFlashAuto,
  MdTimer,
  MdAspectRatio,
  MdSettings,
  MdCameraswitch,
  MdClose,
  MdGridOn,
  MdDownload,
} from "react-icons/md";

type CameraMode = "portrait" | "photo" | "video" | "more";
type FlashMode = "auto" | "on" | "off";
type AspectMode = "full" | "4:3" | "1:1";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: () => void; // closes modal after "Use Photo"
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

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);

  const [flashMode, setFlashMode] = useState<FlashMode>("auto");
  const [timerSeconds, setTimerSeconds] = useState<0 | 3 | 10>(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const [aspectMode, setAspectMode] = useState<AspectMode>("full");
  const [showSettings, setShowSettings] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [mirrorFront, setMirrorFront] = useState(true);

  const [flashOverlay, setFlashOverlay] = useState(false);

  const touchStartX = useRef<number | null>(null);

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

  // Real photo capture → preview
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (facingMode === "user" && mirrorFront) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPreviewImage(dataUrl);
    if (flashMode === "on") triggerFlashOverlay();
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
      onCapture();
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // Portrait mode (placeholder)
  const capturePortrait = () => {
    console.log("Portrait captured", supportsHardwarePortrait ? "(hardware)" : "(software)");
    onCapture();
  };

  // Shutter logic with timer
  const handleShutterPress = () => {
    if (timerSeconds > 0 && mode === "photo") {
      setCountdown(timerSeconds);
      return;
    }

    if (mode === "photo") return capturePhoto();
    if (mode === "portrait") return capturePortrait();

    if (mode === "video") {
      if (!isRecording) startRecording();
      else stopRecording();
    }
  };

  // Hold to record (video mode)
  const handleShutterDown = () => {
    if (mode === "video" && !isRecording) startRecording();
  };

  const handleShutterUp = () => {
    if (mode === "video" && isRecording) stopRecording();
  };

  // Timer countdown effect
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      capturePhoto();
      return;
    }

    const id = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  // Tap to focus (visual only)
  const handleTapToFocus = (e: ReactMouseEvent) => {
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

  // Flash overlay
  const triggerFlashOverlay = () => {
    setFlashOverlay(true);
    setTimeout(() => setFlashOverlay(false), 120);
  };

  // Swipe to change mode
  const handleTouchStart = (e: ReactTouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 40) return;

    const modes: CameraMode[] = ["portrait", "photo", "video", "more"];
    const idx = modes.indexOf(mode);
    if (deltaX < 0 && idx < modes.length - 1) setMode(modes[idx + 1]);
    if (deltaX > 0 && idx > 0) setMode(modes[idx - 1]);
  };

  // UI components
  const TopBar = () => {
    const cycleFlash = () => {
      setFlashMode((prev) =>
        prev === "auto" ? "on" : prev === "on" ? "off" : "auto"
      );
    };

    const flashIcon =
      flashMode === "auto" ? (
        <MdFlashAuto size={28} />
      ) : flashMode === "on" ? (
        <MdFlashOn size={28} />
      ) : (
        <MdFlashOff size={28} />
      );

    return (
      <div className="absolute top-0 left-0 w-full flex justify-between px-6 py-4 z-20 text-white">
        <button onClick={cycleFlash}>{flashIcon}</button>

        <button
          onClick={() =>
            setTimerSeconds((prev) => (prev === 0 ? 3 : prev === 3 ? 10 : 0))
          }
        >
          <MdTimer size={28} />
        </button>

        <button
          onClick={() =>
            setAspectMode((prev) =>
              prev === "full" ? "4:3" : prev === "4:3" ? "1:1" : "full"
            )
          }
        >
          <MdAspectRatio size={28} />
        </button>

        <button onClick={() => setShowSettings((s) => !s)}>
          <MdSettings size={28} />
        </button>
      </div>
    );
  };

  const zoomLevels = [0.5, 1, 2, 5];

  const ZoomBar = () => (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
      <div className="flex flex-col items-center gap-2 bg-black/40 rounded-full px-2 py-3">
        {zoomLevels.map((level) => (
          <button
            key={level}
            onClick={() => setZoom(level)}
            className={`w-8 h-8 rounded-full text-xs text-white flex items-center justify-center transition ${
              zoom === level ? "bg-white text-black" : "bg-white/10"
            }`}
          >
            {level}×
          </button>
        ))}
      </div>
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
        onMouseDown={handleShutterDown}
        onMouseUp={handleShutterUp}
        onTouchStart={handleShutterDown}
        onTouchEnd={handleShutterUp}
        onClick={handleShutterPress}
        className="w-[64px] h-[64px] rounded-full bg-white border-[6px] border-white shadow-xl active:scale-95 transition"
      />

      <button onClick={toggleCamera} className="text-white">
        <MdCameraswitch size={36} />
      </button>
    </div>
  );

  const SettingsPanel = () =>
    showSettings ? (
      <div className="absolute top-16 right-4 bg-black/80 text-white rounded-xl px-4 py-3 text-sm z-30 space-y-2">
        <button
          className="flex items-center gap-2"
          onClick={() => setShowGrid((g) => !g)}
        >
          <MdGridOn />
          <span>{showGrid ? "Hide grid" : "Show grid"}</span>
        </button>
        <button
          className="flex items-center gap-2"
          onClick={() => setMirrorFront((m) => !m)}
        >
          <span>{mirrorFront ? "Unmirror front camera" : "Mirror front camera"}</span>
        </button>
      </div>
    ) : null;

  const GridOverlay = () =>
    showGrid ? (
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/20"
            />
          ))}
        </div>
      </div>
    ) : null;

  const PreviewScreen = () =>
    previewImage ? (
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-200">
        <img
          src={previewImage}
          className="max-w-full max-h-full object-contain rounded-xl"
        />

        <div className="absolute bottom-10 flex gap-6">
          <button
            onClick={() => setPreviewImage(null)}
            className="px-6 py-3 bg-white/20 text-white rounded-full backdrop-blur"
          >
            Retake
          </button>

          <a
            href={previewImage}
            download="capture.jpg"
            className="px-4 py-3 bg-white/20 text-white rounded-full backdrop-blur flex items-center gap-2"
          >
            <MdDownload />
            Download
          </a>

          <button
            onClick={() => {
              setGallery((g) => [...g, previewImage]);
              onCapture();
              setPreviewImage(null);
            }}
            className="px-6 py-3 bg-white text-black rounded-full"
          >
            Use Photo
          </button>
        </div>
      </div>
    ) : null;

  const aspectClass =
    aspectMode === "full"
      ? "w-full h-full"
      : aspectMode === "4:3"
      ? "w-full max-w-[90%] aspect-[4/3]"
      : "w-full max-w-[80%] aspect-square";

  // Final render
  return isOpen ? (
    <div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`relative ${aspectClass}`}>
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover ${
            facingMode === "user" && mirrorFront ? "scale-x-[-1]" : ""
          }`}
          playsInline
          muted
        />

        <GridOverlay />
        <TopBar />
        <ZoomBar />
        <BottomBar />
        <ModeSelector />
        <SettingsPanel />
        <PreviewScreen />

        {flashOverlay && (
          <div className="absolute inset-0 bg-white/80 pointer-events-none" />
        )}

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <span className="text-white text-6xl font-semibold">{countdown}</span>
          </div>
        )}
      </div>

      {gallery.length > 0 && (
        <div className="absolute bottom-24 right-4 z-40">
          <div className="w-16 h-16 rounded-md overflow-hidden border border-white/40">
            <img
              src={gallery[gallery.length - 1]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  ) : null;
}
