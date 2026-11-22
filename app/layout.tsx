import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWARegister from "./PWARegister";

export const metadata: Metadata = {
  title: "SMART TECHNOLOGY | سمارت تكنولوجي",
  description: "كل احتياجاتك التكنولوجية في مكان واحد. أجهزة احترافية، صيانة، شبكات، كاميرات مراقبة وحلول رقمية.",
  metadataBase: new URL("https://pixel-perfect-screenshot-match-42.lovable.app"),
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "SMART TECH" },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: { title: "SMART TECHNOLOGY | سمارت تكنولوجي", description: "كل احتياجاتك التكنولوجية في مكان واحد", locale: "ar_EG", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#070A12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}<PWARegister /></body></html>;
}
