import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Revil2026 | Certificate",
  description: "Get your Revil2026 participation certificate.",
  icons: { icon: "/revil_icon.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
