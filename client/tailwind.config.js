/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gryffindor: {
          primary: '#740001',
          secondary: '#D3A625'
        },
        slytherin: {
          primary: '#1A472A',
          secondary: '#5D5D5D'
        },
        ravenclaw: {
          primary: '#0E1A40',
          secondary: '#946B2D'
        },
        hufflepuff: {
          primary: '#FFD800',
          secondary: '#000000'
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}