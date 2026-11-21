# إعداد لوحة إدارة SMART TECHNOLOGY

## 1) إنشاء مشروع Supabase
- أنشئ مشروعًا في https://supabase.com/
- من Project Settings → API انسخ Project URL و anon/public key.
- أضفهما في إعدادات Environment Variables في بيئة النشر، أو في ملف محلي اسمه `.env.local` بالاعتماد على `.env.example`.

## 2) إنشاء حساب المدير
- من Authentication → Users أضف مستخدمًا بالبريد الإلكتروني وكلمة مرور قوية.
- عطّل التسجيل العام (Sign ups) من إعدادات Authentication؛ لا تنشئ صفحة تسجيل عامة.

## 3) التشغيل
```bash
npm install
npm run dev
```
افتح `/admin/login` وسجّل الدخول بالحساب الذي أنشأته.

## الحالة الحالية
- حماية مسارات الإدارة والتحقق من الجلسة: مضافة عبر Supabase Auth.
- تسجيل الخروج: مضاف.
- إحصائيات الزوار وإدارة المنتجات: غير مفعّلة بعد؛ تتطلب جداول قاعدة بيانات وسياسة RLS وتتبع زيارات حقيقي. لا تعرض اللوحة أرقامًا وهمية.
- لا تضع Service Role Key في متغير يبدأ بـ `NEXT_PUBLIC_` أو داخل المتصفح.
