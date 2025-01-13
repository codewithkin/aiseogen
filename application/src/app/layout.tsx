import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "aiseogen",
  description: "Improve your site's SEO with the power of AI",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6071419245494198"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className}`}>
        <Topbar />
        {children}
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
