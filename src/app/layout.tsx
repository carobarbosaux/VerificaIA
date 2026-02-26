import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { UploadedDocsProvider } from "@/context/UploadedDocsContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VerificaIA - Portal del Estudiante UNIR",
  description:
    "Sistema de gestión y verificación documental para estudiantes UNIR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        <UploadedDocsProvider>{children}</UploadedDocsProvider>
      </body>
    </html>
  );
}
