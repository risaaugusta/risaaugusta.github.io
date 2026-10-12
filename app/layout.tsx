import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Risa Augusta — Software Engineer",
  description: "Portfolio Risa Augusta, Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
