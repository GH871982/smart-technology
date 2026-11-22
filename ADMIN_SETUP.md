# إعداد نظام الحسابات ولوحة إدارة SMART TECHNOLOGY

## 1. إعداد Supabase
- أنشئ مشروعًا من https://supabase.com/
- من Project Settings → API انسخ Project URL و anon/public key.
- أضفهما إلى Environment Variables في Vercel (أو `.env.local` محليًا):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. إعداد قاعدة البيانات
- افتح Supabase → SQL Editor.
- انسخ وشغّل الملف `supabase/schema.sql` من هذا المستودع.
- الملف ينشئ ملفات المستخدمين تلقائيًا عند التسجيل، ويمنح كل حساب جديد دور `user` فقط.

## 3. تفعيل حساب Super Admin
- فعّل Email provider من Authentication → Sign In / Providers.
- أنشئ حسابك من صفحة الموقع `/auth` باستخدام البريد `mohamed.manager2030@gmail.com` وأكمل تأكيد البريد إذا كان مطلوبًا.
- من Supabase → Authentication → Users افتح المستخدم، ثم Edit user / App Metadata، واضبط:
  `{"role":"super_admin"}`
- استخدم App Metadata فقط، ولا تضع الدور في User Metadata أو بيانات التسجيل العامة.
- بعد تسجيل الخروج والدخول مجددًا، افتح `/admin`. يدعم النظام دورَي `super_admin` و `admin`.

## 4. إعداد إعادة تعيين كلمة المرور
- من Authentication → URL Configuration أضف عنوان الموقع المنشور إلى Site URL و Redirect URLs.
- اسمح بالمسار `/reset-password` على نفس النطاق حتى تعمل روابط الاستعادة.

## 5. التشغيل والفحص
```bash
npm install
npm run typecheck
npm run build
npm run dev
``
- `/auth`: تسجيل الدخول وإنشاء حساب واستعادة كلمة المرور.
- `/account`: تعديل الاسم ورقم الهاتف وكلمة المرور.
- `/reset-password`: تعيين كلمة مرور جديدة من رابط البريد.
- `/admin/login`: دخول الإدارة.
- `/admin`: لوحة المؤشرات.
- `/admin/products`: إضافة وحذف المنتجات.

## الصلاحيات والأمان
- التسجيل العام ينشئ مستخدمًا عاديًا فقط.
- لا يستطيع المستخدم ترقية نفسه؛ تغيير الدور محمي بسياسة قاعدة بيانات.
- قراءة الزيارات وإدارة المنتجات وملفات المستخدمين محصورة بحسابات الإدارة.
- لا تضع Service Role Key في متغير يبدأ بـ `NEXT_PUBLIC_` أو داخل المتصفح.
- لا تُعد أرقام الزيارات بيانات شخصية؛ الزوار المميزون يُحسبون بمعرّف جلسة في المتصفح.
