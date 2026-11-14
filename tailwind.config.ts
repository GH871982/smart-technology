import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { midnight: '#05070D', navy: '#0A1020', electric: '#087CFF', cyan: '#00D9FF', neon: '#7855FF', brand: { purple: 'var(--brand-purple)', red: 'var(--brand-red)' } } } },
  plugins: [],
} satisfies Config;
