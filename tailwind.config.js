/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary_blue: '#0c0124',
        card_color: '#d9d9d9',
        active_yellow: '#FFEF4B',
        white: '#fff',
      },
    },
  },
  plugins: [],
};
