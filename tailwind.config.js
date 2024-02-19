/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      background: {
        'tomato':"url('/images/pizza-tomato.png') 20% center/15% auto no-repeat",
      },
      colors: {
        primarybg: '#fffaed',
        primarybtn: '#fbb200',
        primary_text_red: '#f72400',
        primary_text_grey: '#bfb8ae'
      }
    },
  },
  plugins: [],
};
