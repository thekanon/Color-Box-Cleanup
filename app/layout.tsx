"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head>
        <Script
          src="https://buttr.dev/butter.js"
          data-site-id="uqvvwxsqdk"
          async
        ></Script>
      </Head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
