import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMART TECHNOLOGY | سمارت تكنولوجي",
  description: "كل احتياجاتك التكنولوجية في مكان واحد. أجهزة احترافية، صيانة، شبكات، كاميرات مراقبة وحلول رقمية.",
  metadataBase: new URL("https://pixel-perfect-screenshot-match-42.lovable.app"),
  openGraph: { title: "SMART TECHNOLOGY | سمارت تكنولوجي", description: "كل احتياجاتك التكنولوجية في مكان واحد", locale: "ar_EG", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
