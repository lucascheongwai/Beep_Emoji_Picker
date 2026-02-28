/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        bg: '#0e0e0f',
        surface: {
          DEFAULT: '#1a1a1c',
          2: '#252528',
          3: '#2f2f33',
        },
        border: {
          DEFAULT: '#3a3a3f',
          subtle: '#2a2a2e',
        },
        accent: {
          DEFAULT: '#f5c842',
          dim: 'rgba(245,200,66,0.12)',
          glow: 'rgba(245,200,66,0.25)',
        },
        text: {
          primary: '#f0ede8',
          secondary: '#8a8790',
          muted: '#555460',
        },
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
      },
      boxShadow: {
        overlay: '0 24px 64px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)',
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.97)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        popIn: {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '60%':  { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':       { opacity: '0.5', transform: 'scale(0.85)' },
        },
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 0.18s cubic-bezier(0.16,1,0.3,1) both',
        'pop-in':        'popIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-dot':     'pulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
