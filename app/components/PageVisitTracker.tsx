"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PageVisitTracker() {
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    let visitorId = "";
    try {
      visitorId = sessionStorage.getItem("st-visitor-id") || "";
      if (!visitorId) {
        visitorId = typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem("st-visitor-id", visitorId);
      }
    } catch {
      visitorId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    const supabase = createClient();
    void supabase.from("page_visits").insert({ page_path: window.location.pathname, visitor_id: visitorId });
  }, []);

  return null;
}
