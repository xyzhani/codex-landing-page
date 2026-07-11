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
  description: "Turn Every Customer Into a 5★ Review and Every Review Into Social Proof. Fully automated reputation engine for SMBs and eCommerce.",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "AI Social Reputation — Automated Review Management",
    description: "Turn Every Customer Into a 5★ Review and Every Review Into Social Proof.",
    type: "website",
    url: "https://aisocialreputation.com",
    siteName: "AI Social Reputation",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "AI Social Reputation — Automated Review Management for SMBs & eCommerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Social Reputation — Automated Review Management",
    description: "Turn Every Customer Into a 5★ Review and Every Review Into Social Proof.",
    images: ['/og-image.png'],
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