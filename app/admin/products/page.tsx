"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Plus, Trash2, Package } from "lucide-react";

type Product = { id: string; name: string; description: string; category: string; price: number | null; active: boolean; created_at: string };

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const supabase = createClient();
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) setError("تعذر تحميل المنتجات. تأكد من تنفيذ ملف schema.sql.");
    else setItems((data || []) as Product[]);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function addProduct(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    const supabase = createClient();
    const { error } = await supabase.from("products").insert({ name, category: category || "عام", price: price ? Number(price) : null, description, active: true });
    if (error) setError(error.message);
    else { setName(""); setCategory(""); setPrice(""); setDescription(""); await load(); }
    setSaving(false);
  }

  async function removeProduct(id: string) {
    if (!window.confirm("هل تريد حذف هذا المنتج؟")) return;
    const supabase = createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) setError(error.message); else setItems(items.filter(p => p.id !== id));
  }

  return <main dir="rtl" className="min-h-screen bg-[#070A12] px-5 py-8 text-white"><div className="mx-auto max-w-6xl">
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6">
      <div><p className="text-xs tracking-[.2em] text-cyan-300">SMART TECHNOLOGY</p><h1 className="mt-2 text-3xl font-bold">إدارة المنتجات</h1></div>
      <Link href="/admin" className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm"><ArrowRight size={16}/> العودة للوحة التحكم</Link>
    </header>
    <form onSubmit={addProduct} className="mt-7 grid gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-5 md:grid-cols-2">
      <h2 className="flex items-center gap-2 font-bold md:col-span-2"><Plus className="text-cyan-300"/> إضافة منتج</h2>
      <input required placeholder="اسم المنتج" value={name} onChange={e=>setName(e.target.value)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"/>
      <input placeholder="القسم (لابتوبات، إكسسوارات...)" value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"/>
      <input type="number" min="0" step="0.01" placeholder="السعر (اختياري)" value={price} onChange={e=>setPrice(e.target.value)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"/>
      <textarea placeholder="وصف مختصر" value={description} onChange={e=>setDescription(e.target.value)} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 md:row-span-2"/>
      <button disabled={saving} className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 disabled:opacity-60"><Plus size={17}/>{saving ? "جارٍ الحفظ..." : "حفظ المنتج"}</button>
    </form>
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
    <section className="mt-8"><h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><Package className="text-cyan-300"/> المنتجات ({items.length})</h2>
      {loading ? <p className="text-white/50">جارٍ التحميل...</p> : items.length === 0 ? <p className="rounded-xl border border-white/10 p-5 text-white/50">لا توجد منتجات حتى الآن.</p> : <div className="space-y-3">{items.map(p=><article key={p.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[.03] p-4"><div><h3 className="font-semibold">{p.name}</h3><p className="mt-1 text-sm text-white/45">{p.category} · {p.price != null ? p.price.toLocaleString("ar-EG")+" ج.م" : "بدون سعر"} · {p.active ? "ظاهر" : "مخفي"}</p>{p.description && <p className="mt-2 text-sm text-white/55">{p.description}</p>}</div><button onClick={()=>void removeProduct(p.id)} aria-label="حذف المنتج" className="rounded-lg border border-red-400/20 p-2 text-red-300 hover:bg-red-400/10"><Trash2 size={17}/></button></article>)}</div>}
    </section>
  </div></main>;
}
