import Sidebar from "./components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APNorman Case Credit Card Portal",
  description: "Interact with the credit card API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-row bg-zinc-950 text-zinc-100">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen p-8 bg-zinc-950">
          {children}
        </main>
      </body>
    </html>
  );
}
