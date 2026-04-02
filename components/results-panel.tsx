"use client";

interface ResultsPanelProps {
  image: string | null;
  loading: boolean;
  results?: any; // Replace with a proper type later
}

export default function ResultsPanel({ image, loading, results }: ResultsPanelProps) {
  return (
    <div className="w-full p-6 rounded-xl bg-neutral-900/60 border border-neutral-700 shadow-lg shadow-black/40 space-y-6">

      {/* IMAGE PREVIEW */}
      {image && (
        <div className="w-full">
          <img
            src={image}
            alt="Captured"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-6 text-blue-400 animate-pulse text-lg">
          Analyzing scan…
        </div>
      )}

      {/* RESULTS */}
      {!loading && results && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-400">Results</h2>

          <div className="space-y-2 text-gray-300">
            <p className="text-lg">Detected Part: <span className="font-semibold">{results.part}</span></p>
            <p className="text-lg">Confidence: <span className="font-semibold">{results.confidence}%</span></p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-blue-300">Steps</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {results.steps.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
