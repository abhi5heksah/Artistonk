/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          red: '#da291c',
          'red-active': '#b01e0a',
          'red-hover': '#9d2211',
          'red-soft': '#fef2f2',
          'red-border': '#fecaca',
          canvas: '#f8f9fa',
          'canvas-card': '#ffffff',
          'canvas-elevated': '#f3f4f6',
          'canvas-hover': '#f9fafb',
          ink: '#111827',
          body: '#4b5563',
          'body-strong': '#111827',
          muted: '#6b7280',
          'muted-soft': '#9ca3af',
          hairline: '#e5e7eb',
          'hairline-soft': '#f3f4f6',
          'hairline-strong': '#d1d5db',
        },
        accent: {
          yellow: '#f59e0b',
          'yellow-soft': '#fef3c7',
          cyan: '#0284c7',
          'cyan-soft': '#e0f2fe',
          green: '#059669',
          'green-soft': '#ecfdf5',
          crimson: '#dc2626',
        },
      },
      boxShadow: {
        card: '0px 1px 3px 0px rgba(0, 0, 0, 0.05), 0px 1px 2px 0px rgba(0, 0, 0, 0.03)',
        'card-hover': '0px 4px 12px 0px rgba(0, 0, 0, 0.08)',
        modal: '0px 20px 50px -10px rgba(0, 0, 0, 0.2), 0px 0px 1px 1px rgba(0, 0, 0, 0.05)',
        cta: '0px 2px 8px 0px rgba(218, 41, 28, 0.3)',
        glow: '0 0 12px rgba(218, 41, 28, 0.25)',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-up': 'slideInUp 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
