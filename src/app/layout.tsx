import type { Metadata } from "next";
import "./globals.css"; // Assuming a global stylesheet might be added later or already expected by Tailwind setup

export const metadata: Metadata = {
  title: "Firebase Studio AI App",
  description: "AI-powered application built with Next.js and Genkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
