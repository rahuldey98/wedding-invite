/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FDFBF7',
        sand: '#F5EFEB',
        cream: '#FAF6F0',
        charcoal: {
          DEFAULT: '#242220',
          muted: '#5A5652',
          light: '#7A7570',
        },
        crimson: {
          DEFAULT: '#8E2823',
          dark: '#6E1B17',
          light: '#A83B35',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#E5D6BD',
          dark: '#9E7A38',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        inria: ['"Inria Serif"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Italianno"', 'cursive'],
        'script-accent': ['"Lobster Two"', 'cursive'],
        body: ['"Judson"', 'Georgia', 'serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
