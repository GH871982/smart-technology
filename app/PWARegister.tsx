"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PWARegister() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
    const isIosDevice = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (isIosDevice && !isStandalone) {
      setIos(true);
      setShowInstall(true);
    }
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
      setShowInstall(true);
    };
    const onInstalled = () => {
      setShowInstall(false);
      setInstallEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (ios) {
      window.alert('لتثبيت التطبيق على iPhone: اضغط على زر المشاركة في Safari ثم اختر "إضافة إلى الشاشة الرئيسية".');
      return;
    }
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
    setShowInstall(false);
  }

  if (!showInstall) return null;
  return (
    <button
      type="button"
      onClick={install}
      aria-label="تثبيت تطبيق سمارت تكنولوجي"
      style={{ position: "fixed", zIndex: 60, bottom: 18, left: 18, border: "1px solid rgba(103,232,249,.45)", borderRadius: 999, padding: "12px 18px", background: "linear-gradient(135deg,#0891b2,#1d4ed8)", color: "#fff", boxShadow: "0 8px 30px rgba(8,145,178,.28)", fontFamily: "inherit", fontWeight: 700, cursor: "pointer" }}
    >
      ⬇ تثبيت التطبيق
    </button>
  );
}
