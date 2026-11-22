import { ArrowUpLeft, Laptop, Monitor, Camera, Wifi, GraduationCap, Code2, Wrench, ShieldCheck, MessageCircle, Phone, MapPin, ArrowLeft, Zap, CheckCircle2, Cpu, Globe2, Settings2 } from "lucide-react";\nimport PageVisitTracker from "@/app/components/PageVisitTracker";
import AuthHeader from "@/app/components/AuthHeader";

const phone = "01145524545";
const wa = "https://wa.me/201145524545";
const services = [
  { icon: Laptop, title: "اللابتوبات والأجهزة الاحترافية", desc: "أجهزة مناسبة للمصممين والمبرمجين والدراسة والعمل، مع ترشيح يناسب احتياجك." },
  { icon: Wrench, title: "الصيانة والتطوير", desc: "ترقية المكونات، حلول الأعطال، وتجهيز جهازك لأفضل أداء ممكن." },
  { icon: Code2, title: "البرامج والتصميم", desc: "تجهيز Windows والبرامج، وأدوات التصميم والمونتاج والعمل ثلاثي الأبعاد." },
  { icon: Camera, title: "كاميرات المراقبة", desc: "حلول مراقبة عملية لمتابعة وتأمين المنازل والشركات." },
  { icon: Wifi, title: "الشبكات والإنترنت", desc: "إعداد الراوترات والشبكات وتحسين تغطية الاتصال." },
  { icon: GraduationCap, title: "الخدمات التعليمية", desc: "مساعدة في خدمات الطلاب والتقديم والتنسيق والبرامج الجامعية." },
  { icon: Globe2, title: "المواقع والمنصات", desc: "تصميم مواقع إلكترونية ومنصات تعليمية تناسب نشاطك." },
  { icon: Monitor, title: "الشاشات والإكسسوارات", desc: "مستلزمات وأدوات تقنية للاستخدام اليومي والمهني." },
];
const features = ["اختيار تقني مناسب لاحتياجك", "اهتمام بالتفاصيل وجودة التنفيذ", "حلول للأفراد والطلاب والشركات", "متابعة ودعم قبل وبعد الشراء"];

export default function Home() {
  return <main className="min-h-screen overflow-hidden bg-[#070A12] text-white"><PageVisitTracker/>
    <div className="pointer-events-none fixed inset-0 -z-0 opacity-70" style={{backgroundImage:"radial-gradient(ellipse at 80% 5%,rgba(24,119,242,.20),transparent 35%),radial-gradient(ellipse at 10% 40%,rgba(111,65,220,.13),transparent 35%)"}} />
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070A12]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#home" className="flex items-center gap-3" aria-label="Smart Technology home">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-300"><Cpu size={25}/></span>
          <span className="leading-tight"><b className="block text-lg tracking-[.12em]">SMART <span className="text-cyan-300">TECHNOLOGY</span></b><small className="text-xs text-white/45">سمارت تكنولوجي</small></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex">
          <a className="hover:text-cyan-300" href="#about">من نحن</a><a className="hover:text-cyan-300" href="#services">خدماتنا</a><a className="hover:text-cyan-300" href="#why">لماذا نحن</a><a className="hover:text-cyan-300" href="#contact">تواصل معنا</a>
        </nav>
        <AuthHeader whatsappUrl={wa} />
      </div>
    </header>
    <section id="home" className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 pt-20 md:grid-cols-2 md:pb-32 md:pt-28">
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs text-cyan-200"><Zap size={14}/> التكنولوجيا ببساطة... وبخبرة</div>
        <h1 className="text-4xl font-extrabold leading-[1.35] md:text-6xl">كل احتياجاتك<br/><span className="bg-gradient-to-l from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">التكنولوجية</span><br/>في مكان واحد.</h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-white/60 md:text-lg">من الأجهزة الاحترافية إلى الحلول التقنية المتكاملة؛ نساعدك تختار وتنفّذ الحل المناسب لشغلك ودراستك وحياتك اليومية.</p>
        <div className="mt-9 flex flex-wrap gap-3"><a href={wa} target="_blank" rel="noreferrer" className="rounded-full bg-cyan-400 px-7 py-3.5 font-bold text-[#06101b] transition hover:-translate-y-1 hover:bg-cyan-300">ابدأ التواصل <ArrowLeft className="mr-2 inline" size={17}/></a><a href="#services" className="rounded-full border border-white/15 px-7 py-3.5 font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/5">اكتشف خدماتنا</a></div>
        <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/45"><span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300"/> حلول متنوعة</span><span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300"/> اهتمام بالتفاصيل</span><span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300"/> دعم ومتابعة</span></div>
      </div>
      <div className="relative mx-auto w-full max-w-xl">
        <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-[90px]"/>
        <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[.10] to-white/[.02] p-5 shadow-2xl shadow-blue-950/40 backdrop-blur">
          <div className="rounded-[1.5rem] border border-cyan-200/15 bg-[#0b1424] p-7">
            <div className="mb-8 flex items-center justify-between"><span className="text-xs tracking-[.2em] text-cyan-200">SMART ECOSYSTEM</span><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399]"/></div>
            <div className="grid grid-cols-2 gap-4">
              {[[Laptop,"PRO DEVICES","أجهزة احترافية"],[Camera,"SECURITY","أنظمة مراقبة"],[Wifi,"CONNECTIVITY","شبكات واتصال"],[Code2,"DIGITAL","حلول رقمية"]].map(([Icon,en,ar],i)=>{const I=Icon as typeof Laptop;return <div key={String(en)} className="rounded-2xl border border-white/10 bg-white/[.035] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/[.06]"><I className="mb-5 text-cyan-300" size={27}/><div className="text-[10px] tracking-[.16em] text-white/40">{String(en)}</div><div className="mt-1 text-sm font-semibold">{String(ar)}</div></div>})}
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl border border-cyan-300/15 bg-cyan-300/[.06] px-4 py-3"><span className="text-xs text-white/60">Technology that works for you</span><ArrowUpLeft className="text-cyan-300" size={18}/></div>
          </div>
        </div>
        <div className="absolute -bottom-5 -left-4 rounded-2xl border border-white/10 bg-[#101a2a] px-5 py-3 shadow-xl"><div className="text-xs text-white/45">SMART TECHNOLOGY</div><div className="mt-1 text-sm font-bold text-cyan-200">حلول أذكى لمستقبل أفضل</div></div>
      </div>
    </section>
    <section id="about" className="relative border-y border-white/10 bg-white/[.025] py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[.8fr_1.2fr] md:items-center">
        <div><p className="mb-3 text-xs font-bold tracking-[.25em] text-cyan-300">ABOUT SMART TECHNOLOGY</p><h2 className="text-3xl font-extrabold md:text-4xl">التقنية مش مجرد أجهزة،<br/><span className="text-white/45">دي تجربة متكاملة.</span></h2></div>
        <p className="text-base leading-9 text-white/60">في SMART TECHNOLOGY بنجمع بين الأجهزة والحلول والخدمات التقنية في تجربة واحدة. هدفنا إننا نسهّل عليك الوصول للأدوات المناسبة، ونقدّم لك اختيارات واضحة وتنفيذًا يهتم بالجودة والتفاصيل، سواء كنت طالبًا أو محترفًا أو صاحب مشروع.</p>
      </div>
    </section>
    <section id="services" className="mx-auto max-w-7xl px-5 py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 text-xs font-bold tracking-[.25em] text-cyan-300">WHAT WE DO</p><h2 className="text-3xl font-extrabold md:text-4xl">خدماتنا وحلولنا</h2></div><p className="max-w-md text-sm leading-7 text-white/45">مجموعة متكاملة من الخدمات المصممة لتغطّي احتياجاتك التقنية من البداية للنهاية.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(({icon:Icon,title,desc},i)=><article key={title} className="group rounded-2xl border border-white/10 bg-white/[.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/[.055]"><div className="mb-7 grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 transition group-hover:bg-cyan-300 group-hover:text-[#06101b]"><Icon size={23}/></div><div className="mb-2 text-xs text-white/25">0{i+1}</div><h3 className="mb-3 text-lg font-bold">{title}</h3><p className="text-sm leading-7 text-white/50">{desc}</p></article>)}</div>
    </section>
    <section id="why" className="border-y border-white/10 bg-gradient-to-l from-blue-500/[.08] via-transparent to-violet-500/[.08] py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center"><div><p className="mb-3 text-xs font-bold tracking-[.25em] text-cyan-300">WHY SMART TECHNOLOGY</p><h2 className="text-3xl font-extrabold leading-relaxed md:text-4xl">اختيارك للتكنولوجيا<br/>يبدأ من المكان الصح.</h2><p className="mt-5 max-w-lg text-sm leading-8 text-white/50">نؤمن إن الحل التقني الناجح هو اللي يناسب احتياجك الحقيقي، ويكون واضحًا وعمليًا ويضيف قيمة فعلية.</p></div><div className="grid gap-4 sm:grid-cols-2">{features.map((f)=><div key={f} className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0c1220]/70 p-5"><ShieldCheck className="shrink-0 text-cyan-300" size={21}/><span className="text-sm leading-7 text-white/75">{f}</span></div>)}</div></div>
    </section>
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-gradient-to-br from-[#10253b] via-[#10172b] to-[#17112b] p-8 text-center md:p-16"><div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"/><div className="relative"><p className="mb-4 text-xs font-bold tracking-[.25em] text-cyan-300">LET'S CONNECT</p><h2 className="text-3xl font-extrabold md:text-5xl">جاهز تبدأ خطوتك التقنية الجاية؟</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-white/55">تواصل معنا واسأل عن الجهاز أو الخدمة المناسبة ليك. فريق SMART TECHNOLOGY جاهز يساعدك.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href={wa} target="_blank" rel="noreferrer" className="rounded-full bg-cyan-400 px-7 py-3.5 font-bold text-[#06101b] hover:bg-cyan-300"><MessageCircle className="ml-2 inline" size={18}/> واتساب الآن</a><a href={"tel:"+phone} className="rounded-full border border-white/20 px-7 py-3.5 font-bold hover:bg-white/5"><Phone className="ml-2 inline" size={17}/> {phone}</a></div><div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/35"><MapPin size={14}/> دمنهور، مصر</div></div></div>
    </section>
    <footer className="border-t border-white/10 px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right"><div><b className="tracking-[.12em]">SMART <span className="text-cyan-300">TECHNOLOGY</span></b><p className="mt-1 text-xs text-white/35">كل احتياجاتك التكنولوجية... في مكان واحد</p></div><div className="text-xs text-white/35">© {new Date().getFullYear()} SMART TECHNOLOGY. جميع الحقوق محفوظة.</div><a href={wa} target="_blank" rel="noreferrer" className="text-sm text-cyan-300 hover:text-cyan-200">تواصل معنا <ArrowUpLeft className="mr-1 inline" size={14}/></a></div></footer>
    <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-900/40 transition hover:scale-105"><MessageCircle size={26}/></a>
  </main>;
}
