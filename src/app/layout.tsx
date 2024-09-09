import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIH Internal - Helpdesk",
  description:
    "Smart India Hackathon 2024 - Internal Helpdesk, It is a platform for the participants to get their queries resolved throughout the hackathon. It is a one-stop solution for all the queries related to the hackathon. GITA VDC is the host of the Smart India Hackathon 2024(Internal) at GITAM(Deemed to be University) Bengaluru.",
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
        <link rel="icon" href="/cdx.png" type="image/gif" sizes="16x16"></link>
        <link href="https://fonts.cdnfonts.com/css/samarkan" rel="stylesheet"></link>

      </head>
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
