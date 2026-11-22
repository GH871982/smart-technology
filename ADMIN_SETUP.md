# إعداد لوحة إدارة SMART TECHNOLOGY

## 1. إنشاء مشروع Supabase
- أنشئ مشروعًا من https://supabase.com/
- من Project Settings → API انسخ Project URL و anon/public key.
- أضفهما إلى Environment Variables في Vercel (أو `.env.local` محليًا):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. إعداد قاعدة البيانات
- افتح Supabase → SQL Editor.
- انسخ وشغّل الملف `supabase/schema.sql` من هذا المستودع.

## 3. حساب المدير فقط
- Authentication → Users: أنشئ حساب المدير يدويًا، لا تنشئ صفحة تسجيل عامة.
- افتح الحساب/Edit user → App Metadata واضبط `role` على `admin` (مثال JSON: `{"role":"admin"}`).
- عطّل التسجيل العام (Sign ups) في إعدادات Authentication.
- لا تمنح دور admin لأي مستخدم غير موثوق.

## 4. التشغيل
```bash
npm install
npm run dev
```
افتح `/admin/login` وسجّل الدخول بالحساب الذي يحمل App Metadata role=admin.

## ما يعمل بعد الإعداد
- دخول محمي، ويتطلب دور admin.
- لوحة مؤشرات حقيقية: إجمالي زيارات الصفحات، جلسات متصفح مميزة (تقريبية)، زيارات آخر 7 أيام، عدد المنتجات.
- تسجيل مشاهدة الصفحة الرئيسية من جلسة المتصفح.
- صفحة `/admin/products` لإضافة وحذف المنتجات.
- سياسات RLS تمنع قراءة الزيارات وإدارة المنتجات إلا لحساب admin.
- الموقع العام يقرأ المنتجات النشطة فقط.

## ملاحظات
- لا تضع Service Role Key في متغير يبدأ بـ `NEXT_PUBLIC_` أو داخل المتصفح.
- حسابات Supabase Auth لا تكفي وحدها؛ يلزم تعيين app_metadata.role=admin للحساب.
- إحصائية الزوار المميزين مبنية على معرّف جلسة محفوظ في sessionStorage، ولا تعني تحديد الهوية الشخصية.
- قبل النشر، شغّل `npm run typecheck` و `npm run build` وتحقق من إعدادات Vercel.
