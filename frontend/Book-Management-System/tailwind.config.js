/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#0F172A',
          600: '#0C1321',
          700: '#0A101A',
          800: '#081014',
          900: '#060D11',
        },
        accent: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#0F9F6E',
          700: '#0C8560',
          800: '#0A7150',
          900: '#0B5E3F',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        text: '#111827',
        muted: '#64748B',
        secondary: {
          50: '#F8FAFC',
          100: '#E2E8F0',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#020617',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        md: '0 4px 10px -4px rgba(15, 23, 42, 0.08)',
        lg: '0 15px 35px -15px rgba(15, 23, 42, 0.15)',
        xl: '0 25px 55px -25px rgba(15, 23, 42, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.24s ease-in-out',
        'slide-in': 'slideIn 0.24s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
