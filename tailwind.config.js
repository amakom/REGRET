/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        regret: {
          dark: '#0a0a0a',
          red: '#661111', // Muted red
          text: '#a0a0a0',
        }
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
      }
    },
  },
  plugins: [],
}
