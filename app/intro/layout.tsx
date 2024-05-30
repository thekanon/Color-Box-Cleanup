"use client";
import React, { ReactNode } from "react";
import Script from "next/script";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Script
        src="https://buttr.dev/butter.js"
        strategy="beforeInteractive"
        onLoad={() => {
          (window as any).CodenButter &&
            (window as any).CodenButter("boot", {
              siteId: "uqvvwxsqdk",
              auto: true,
            });
        }}
      />

      {children}
    </>
  );
}
