/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
        colors: {
            'bg-primary': '#161a1f',
            'bg-secondary': '#22252A',
            'bg-tertiary': '#FFF673',
            'text-gray': '#999',
        },
    },
  },
  plugins: [],
};
