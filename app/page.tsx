import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Add padding so the navbar doesn't cover content */}
      <main className="pt-28">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 pb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-xl">
            See Life Through a Clearer Lens
          </h1>

          <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            Clear Lens Reality is software designed to help people gain clarity, take action,
            and move forward with confidence — one step at a time.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 rounded-lg border border-blue-500 hover:bg-blue-500/20 transition"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            What Clear Lens Reality Helps You Do
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Gain Clarity</h3>
              <p className="text-blue-100">
                Understand what matters most with tools designed to simplify your world.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Take Action</h3>
              <p className="text-blue-100">
                Move forward with confidence using intelligent, supportive features.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Feel Supported</h3>
              <p className="text-blue-100">
                Built to help people, not overwhelm them — simple, powerful, human.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See More Clearly?
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto mb-10">
            Start your journey with Clear Lens Reality today and take the first step toward clarity.
          </p>
          <a
            href="#"
            className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 text-lg"
          >
            Get Started
          </a>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-blue-300/70 text-sm">
          © {new Date().getFullYear()} Clear Lens Reality. All rights reserved.
        </footer>

      </main>
    </div>
  );
}
