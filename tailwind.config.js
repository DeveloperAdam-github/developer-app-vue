/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        position: 'position',
      },
      fontFamily: {
        headline: ['F1-Regular'],
        boldHeadline: ['F1-Bold'],
      },
    },
  },
  plugins: [],
};
