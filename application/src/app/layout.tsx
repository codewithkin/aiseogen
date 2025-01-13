import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar";

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
      <body className={`${inter.className}`}>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
