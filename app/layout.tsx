import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Match Chat",
  description: "Find GitHub repositories that match your project requirements.",
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
