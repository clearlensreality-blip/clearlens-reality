import "./globals.css";

export const metadata = {
  title: "Clear Lens Reality",
  description: "See life through a clearer lens.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
