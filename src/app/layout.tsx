import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aarambh - Helpdesk",
  description:
    "Aarambh 24 is an entrepreneurship open day event designed to ignite innovation and collaboration within the startup ecosystem. It offers a platform for aspiring entrepreneurs to network, pitch ideas, and engage like minded people fostering a dynamic environment for growth and knowledge exchange.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* set favicon */}
        <link rel="icon" href="https://vdc.gitam.edu/main_ui/images/vdc_imgs/favicon.png" type="image/gif" sizes="16x16"></link>
      </head>
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
