"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowUpLeft,UserRound,LogOut } from "lucide-react";
export default function AuthHeader({whatsappUrl}:{whatsappUrl:string}){
 const [email,setEmail]=useState<string|null>(null);const [ready,setReady]=useState(false);const router=useRouter();
 useEffect(()=>{try{const supabase=createClient();supabase.auth.getUser().then(({data})=>{setEmail(data.user?.email??null);setReady(true);});const {data:listener}=supabase.auth.onAuthStateChange((_event,session)=>{setEmail(session?.user?.email??null);setReady(true);});return()=>listener.subscription.unsubscribe();}catch{setReady(true);}},[]);
 async function logout(){await createClient().auth.signOut();setEmail(null);router.refresh();}
 if(!ready)return <Link href="/auth" className="rounded-full border border-cyan-300/35 px-4 py-2.5 text-sm font-semibold text-cyan-200">تسجيل الدخول</Link>;
 if(!email)return <div className="flex items-center gap-2"><Link href="/auth" className="rounded-full border border-cyan-300/35 px-4 py-2.5 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/10">تسجيل الدخول</Link><a href={whatsappUrl} target="_blank" rel="noreferrer" className="hidden rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-bold text-[#06101b] sm:inline-flex">تواصل معنا <ArrowUpLeft className="mr-1 inline" size={16}/></a></div>;
 return <div className="flex items-center gap-2"><Link href="/account" className="flex items-center gap-2 rounded-full border border-cyan-300/35 px-3 py-2.5 text-sm text-cyan-200"><UserRound size={16}/> حسابي</Link><button onClick={logout} aria-label="تسجيل الخروج" className="rounded-full border border-white/15 p-2.5 text-white/70 hover:border-cyan-300/50"><LogOut size={16}/></button></div>;
}
