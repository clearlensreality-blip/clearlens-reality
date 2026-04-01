import "./globals.css";
import Navbar from "../components/navbar"; // <-- add this

export const metadata = {
  title: "Clear Lens Reality",
  description: "See life through a clearer lens.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome for social icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body>

        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        {children}

        {/* GLOBAL FOOTER */}
        <footer className="w-full mt-32 border-t border-white/10 py-12 px-6 text-gray-400">

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* BRAND */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">ClearLens Reality</h2>
              <p className="text-sm text-gray-500">
                Precision. Clarity. Insight.
              </p>

              {/* SOCIAL ICONS */}
              <div className="flex items-center space-x-4 mt-4">
                <a href="#" className="hover:text-white transition">
                  <i className="fa-brands fa-twitter text-xl"></i>
                </a>
                <a href="#" className="hover:text-white transition">
                  <i className="fa-brands fa-instagram text-xl"></i>
                </a>
                <a href="#" className="hover:text-white transition">
                  <i className="fa-brands fa-facebook text-xl"></i>
                </a>
                <a href="#" className="hover:text-white transition">
                  <i className="fa-brands fa-tiktok text-xl"></i>
                </a>
              </div>
            </div>

            {/* NAVIGATION */}
            <div>
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/about" className="hover:text-white transition">About</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="/login" className="hover:text-white transition">Login</a></li>
                <li><a href="/signup" className="hover:text-white transition">Sign Up</a></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">

                <li className="flex items-center">
                  <i className="fa-solid fa-envelope mr-3 text-blue-400"></i>
                  clearlensreality@gmail.com
                </li>

                <li className="flex items-center">
                  <i className="fa-solid fa-location-dot mr-3 text-blue-400"></i>
                  United Kingdom
                </li>

                <li className="flex items-center">
                  <i className="fa-solid fa-phone mr-3 text-blue-400"></i>
                  +44 0000 000000
                </li>

              </ul>
            </div>

          </div>

          {/* COPYRIGHT */}
          <div className="text-center text-gray-500 text-sm mt-12">
            © {new Date().getFullYear()} ClearLens Reality. All rights reserved.
          </div>

        </footer>

      </body>
    </html>
  );
}
