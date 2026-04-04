"use client";

export default function CameraPreview({
  image,
  onRetake,
  onUse,
}: {
  image: string;
  onRetake: () => void;
  onUse: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <img
        src={image}
        className="max-w-full max-h-full object-contain rounded-xl"
      />

      <div className="absolute bottom-10 flex gap-6">
        <button
          onClick={onRetake}
          className="px-6 py-3 bg-white/20 text-white rounded-full backdrop-blur"
        >
          Retake
        </button>

        <button
          onClick={onUse}
          className="px-6 py-3 bg-white text-black rounded-full"
        >
          Use Photo
        </button>
      </div>
    </div>
  );
}
