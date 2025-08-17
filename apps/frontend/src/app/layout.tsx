import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import GlobalLayoutContent from "@/components/GlobalLayoutContent";

import Bugsnag from "@bugsnag/js";
import BugsnagPerformance from "@bugsnag/browser-performance";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Bugsnag initialization remains here as it's typically client-side setup
if (typeof window !== "undefined") {
  // Ensure Bugsnag runs only in the browser environment
  Bugsnag.start({ apiKey: "452f2c7e4be3e335498c8ce760a969dd" });
  BugsnagPerformance.start({ apiKey: "452f2c7e4be3e335498c8ce760a969dd" });
}

export const metadata: Metadata = {
  title: "SwapConnect App",
  description:
    "swapping, buying, and selling quality tech devices and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/ds83mhjcm/image/upload/v1719573356/SwapConnect/favicon-logo_bci2ur.png"
          type="image/png"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Render the Client Component here */}
        <GlobalLayoutContent>{children}</GlobalLayoutContent>
      </body>
    </html>
  );
}
