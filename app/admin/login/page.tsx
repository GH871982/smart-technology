"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LockKeyhole, Cpu } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر تسجيل الدخول. تحقق من البيانات والإعدادات.");
    } finally {
      setBusy(false);
    }
  }

  return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#070A12] px-5 text-white">
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[.04] p-8 shadow-2xl">
      <div className="mb-8 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Cpu size={27}/></span><div><p className="font-bold tracking-wider">SMART TECHNOLOGY</p><p className="text-sm text-white/45">لوحة الإدارة</p></div></div>
      <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
      <p className="mt-2 text-sm leading-7 text-white/50">سجّل الدخول بحساب الإدارة المضاف في مشروع Supabase.</p>
      {params.get("setup") && <p className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-3 text-sm leading-6 text-amber-200">يلزم إعداد مفاتيح Supabase في متغيرات البيئة قبل استخدام لوحة الإدارة.</p>}
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block text-sm text-white/70">البريد الإلكتروني<input required type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="block text-sm text-white/70">كلمة المرور<input required type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        {error && <p role="alert" className="rounded-xl bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
        <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 font-bold text-[#06101b] transition hover:bg-cyan-300 disabled:opacity-50"><LockKeyhole size={17}/>{busy ? "جارٍ التحقق..." : "دخول آمن"}</button>
      </form>
      <a href="/" className="mt-6 block text-center text-sm text-white/40 hover:text-cyan-300">العودة إلى الموقع</a>
    </div>
  </main>;
}
