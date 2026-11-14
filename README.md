# SMART TECHNOLOGY website
Next.js 14 · React · TypeScript · Tailwind · Framer Motion · Lucide

    npm install
    npm run dev        # http://localhost:3000
    npm run build

## Where to edit
- Phone, WhatsApp, address, map, social links: `lib/site.ts`
- Arabic/English text: `lib/i18n.tsx`
- Services: `data/services.ts` · Products and categories: `data/products.ts` (starts empty, nothing is invented)
- Logo: `public/brand/README.md`

## Needs a backend or external service (not faked)
- Contact form: currently opens WhatsApp with the message prefilled. Email delivery needs a server route plus a mail provider key.
- Product management from a dashboard: needs a database/CMS. Until then, edit `data/products.ts`.
- Set the real domain in `lib/site.ts` (`url`) before deploying (SEO/Open Graph).
- Animated statistics and customer reviews are intentionally left out until real figures exist.
