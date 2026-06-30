import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Business Reputation Management System",
  description: "Turn Every Customer Into a Google Review and Every Review Into Social Proof. Fully automated reputation engine for SMBs and eCommerce.",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "AI Business Reputation Management System",
    description: "Turn Every Customer Into a Google Review and Every Review Into Social Proof.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration='manual';window.addEventListener('beforeunload',function(){history.scrollRestoration='auto'})`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030712] text-[#f1f5f9]`}
      >
        {children}
      </body>
    </html>
  );
}