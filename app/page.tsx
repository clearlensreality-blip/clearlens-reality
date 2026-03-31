export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white px-6">

      <div className="text-center max-w-3xl mx-auto mt-20">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
          See the World with Clarity
        </h1>

        <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10">
          ClearLens Reality helps you understand objects, environments, and everyday challenges 
          through calm, accessible AI‑powered scanning designed for neurodivergent users.
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="/scan"
            className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition"
          >
            Start Scanning
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-lg border border-neutral-500 text-neutral-300 hover:bg-neutral-800 transition"
          >
            Log In
          </a>
        </div>
      </div>

      <footer className="text-neutral-500 text-sm text-center mt-20 pb-10">
        ClearLens Reality © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
