/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka"', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        primary: '#FF4D94',
        'retro-pink': '#FFB7D5', 
        'retro-yellow': '#FFF9C4',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
