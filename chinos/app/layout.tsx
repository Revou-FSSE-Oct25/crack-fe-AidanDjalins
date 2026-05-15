import type { Metadata } from "next";
import { Montserrat, Geist } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chinoss CoffeeSpace",
  description: "Welcome to Chinoss CoffeeSpace! Stick around for a brew or two!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${montserrat.variable} antialiased`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
