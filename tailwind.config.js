/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D92D27',
        secondary: '#f50057',
        background: '#F3F3F3',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: '#root',
};
