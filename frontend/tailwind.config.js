/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        primary: '#2563EB',
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        bgLight: '#F8FAFC',
        cardBg: '#FFFFFF',
        textDark: '#0F172A'
      },
      boxShadow: {
        soft: '0 30px 80px rgba(59, 130, 246, 0.08)',
        glow: '0 24px 60px rgba(59, 130, 246, 0.18)'
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 45%)',
        'soft-radial': 'radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 32%)'
      }
    }
  },
  plugins: []
}
