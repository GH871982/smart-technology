"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Activity, Boxes, LogOut, ShieldCheck, Users, Eye, ArrowUpLeft } from "lucide-react";

type Stats = { visits: number; unique: number; products: number; weekVisits: number };

export default function AdminDashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;
    async function load() {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) { router.replace("/admin/login"); return; }
      setEmail(user.email ?? "");
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const [visitCount, productCount, weekCount, visitors] = await Promise.all([
        supabase.from("page_visits").select("*", { count: "exact", head: true }),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("page_visits").select("*", { count: "exact", head: true }).gte("visited_at", since),
        supabase.from("page_visits").select("visitor_id").limit(5000),
      ]);
      if (!cancelled) {
        if (visitCount.error || productCount.error || weekCount.error || visitors.error) {
          setStatsError("لم يتم تحميل البيانات. تأكد من إعداد Supabase وتشغيل supabase/schema.sql.");
        } else {
          const ids = new Set((visitors.data || []).map(v => v.visitor_id));
          setStats({ visits: visitCount.count || 0, unique: ids.size, products: productCount.count || 0, weekVisits: weekCount.count || 0 });
        }
        setBusy(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, [router]);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const cards = [
    { icon: Eye, title: "إجمالي مشاهدات الصفحات", value: stats?.visits, note: "كل زيارات الصفحات المسجلة" },
    { icon: Users, title: "زوار مميزون", value: stats?.unique, note: "معرّفات جلسات متصفح، وليست تتبعًا شخصيًا" },
    { icon: Activity, title: "زيارات آخر 7 أيام", value: stats?.weekVisits, note: "حسب وقت التسجيل" },
    { icon: Boxes, title: "المنتجات", value: stats?.products, note: "عدد المنتجات بقاعدة البيانات" },
  ];

  return <main dir="rtl" className="min-h-screen bg-[#070A12] px-5 py-8 text-white">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div><p className="text-xs tracking-[.2em] text-cyan-300">SMART TECHNOLOGY</p><h1 className="mt-2 text-3xl font-extrabold">لوحة الإدارة</h1><p className="mt-2 text-sm text-white/45">مرحبًا، {email}</p></div>
        <div className="flex gap-2"><Link href="/admin/products" className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950"><Boxes size={16}/> إدارة المنتجات</Link><button onClick={signOut} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:border-cyan-300/50"><LogOut size={16}/> تسجيل الخروج</button></div>
      </header>
      <section className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-300/[.06] p-5">
        <div className="flex items-center gap-3 text-cyan-200"><ShieldCheck size={22}/><h2 className="font-bold">لوحة إدارة SMART TECHNOLOGY</h2></div>
        <p className="mt-2 text-sm leading-7 text-white/60">تعرض الأرقام بيانات قاعدة الموقع الفعلية بعد تشغيل إعداد قاعدة البيانات. الزوار المميزون يُحسبون بمعرّف جلسة مخزّن محليًا في المتصفح.</p>
      </section>
      {statsError && <p role="alert" className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-200">{statsError}</p>}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({icon:Icon,title,value,note})=><article key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><Icon className="mb-5 text-cyan-300" size={25}/><h3 className="text-sm font-semibold text-white/65">{title}</h3><p className="mt-2 text-3xl font-extrabold">{busy ? "…" : value?.toLocaleString("ar-EG") ?? "—"}</p><p className="mt-2 text-xs leading-6 text-white/40">{note}</p></article>)}
      </div>
      <section className="mt-7 rounded-2xl border border-white/10 bg-white/[.025] p-5"><h2 className="font-bold">اختصارات الإدارة</h2><div className="mt-4 flex flex-wrap gap-3"><Link href="/admin/products" className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm hover:border-cyan-300/40">إضافة أو حذف المنتجات <ArrowUpLeft size={16} className="text-cyan-300"/></Link><Link href="/" className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm hover:border-cyan-300/40">فتح الموقع <ArrowUpLeft size={16} className="text-cyan-300"/></Link></div></section>
      <p className="mt-8 text-xs leading-6 text-white/35">البيانات لا تظهر إلا بعد تهيئة Supabase وتنفيذ ملف قاعدة البيانات. لا يتم توليد أرقام افتراضية.</p>
    </div>
  </main>;
}
