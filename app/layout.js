import "./globals.css";

export const metadata = {
  title: "Shipping Calculator | Erendira's Boutique",
  description: "Calculate shipping rates by ZIP code and package weight.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
