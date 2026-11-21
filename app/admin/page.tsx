"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Activity, Boxes, LogOut, ShieldCheck, Users } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) router.replace("/admin/login");
      else setEmail(data.user.email ?? "");
      setBusy(false);
    });
  }, [router]);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  if (busy) return <main className="grid min-h-screen place-items-center bg-[#070A12] text-cyan-200">جارٍ التحقق من صلاحية الدخول...</main>;

  return <main dir="rtl" className="min-h-screen bg-[#070A12] px-5 py-8 text-white">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div><p className="text-xs tracking-[.2em] text-cyan-300">SMART TECHNOLOGY</p><h1 className="mt-2 text-3xl font-extrabold">لوحة الإدارة</h1><p className="mt-2 text-sm text-white/45">مرحبًا، {email}</p></div>
        <button onClick={signOut} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:border-cyan-300/50"><LogOut size={16}/> تسجيل الخروج</button>
      </header>
      <section className="mt-8 rounded-2xl border border-cyan-300/20 bg-cyan-300/[.06] p-5">
        <div className="flex items-center gap-3 text-cyan-200"><ShieldCheck size={22}/><h2 className="font-bold">تم تأمين مدخل لوحة الإدارة</h2></div>
        <p className="mt-2 text-sm leading-7 text-white/60">تسجيل الدخول والتحقق من الجلسة يعملان عبر Supabase Auth. لم يتم عرض أرقام زوار أو منتجات تجريبية؛ ستظهر الإحصائيات بعد ربط مصدر بيانات حقيقي.</p>
      </section>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {[{icon:Users,title:"الزوار",desc:"بانتظار ربط سجل الزيارات الحقيقي"},{icon:Activity,title:"إحصائيات الموقع",desc:"بانتظار تفعيل تتبع الصفحات"},{icon:Boxes,title:"المنتجات",desc:"بانتظار إنشاء قاعدة بيانات المنتجات"}].map(({icon:Icon,title,desc})=><article key={title} className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><Icon className="mb-5 text-cyan-300" size={25}/><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-white/45">{desc}</p></article>)}
      </div>
      <p className="mt-8 text-xs leading-6 text-white/35">هذه نسخة أولية آمنة على فرع منفصل. لن يتغير الموقع المنشور إلا بعد مراجعة التعديلات ودمجها ونشرها.</p>
    </div>
  </main>;
}
