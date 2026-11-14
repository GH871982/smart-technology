import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n';
import { site } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

const font = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const description = 'كل احتياجاتك التكنولوجية... في مكان واحد';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'SMART TECHNOLOGY | سمارت تكنولوجي', template: '%s | SMART TECHNOLOGY' },
  description,
  openGraph: { title: 'SMART TECHNOLOGY | سمارت تكنولوجي', description, type: 'website', locale: 'ar_EG' },
};
export const viewport: Viewport = { themeColor: '#05070D' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={font.className}>
        <I18nProvider>
          <Loader />
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
