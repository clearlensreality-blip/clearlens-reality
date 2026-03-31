import "./globals.css";
import Navbar from "../components/navbar";

export const metadata = {
  title: "ClearLens Reality",
  description: "AI-powered clarity for everyday life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="pt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
