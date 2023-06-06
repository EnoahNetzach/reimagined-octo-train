/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        ternary: 'rgb(var(--color-ternary) / <alpha-value>)',
        white: '#F0F2EB',
        black: '#0D0D0D',
      },
      gridTemplateColumns: {
        'auto-left': 'auto minmax(0, 1fr)',
        'auto-right': 'minmax(0, 1fr) auto',
        main: 'minmax(300px, 1fr), 2fr',
      },
    },
  },
  plugins: [],
}
