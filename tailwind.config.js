/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#ef4444',
        'brand-gold': '#f59e0b',
        'dark-charcoal': '#1a1a1a',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
