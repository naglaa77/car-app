import "./globals.css";
import type { Metadata } from "next";
import { Footer, Navbar } from "@/components";
export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best cars in world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="reltive">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
