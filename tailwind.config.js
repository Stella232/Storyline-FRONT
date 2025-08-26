/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    extend: {
      colors: {
        primary: {
          100: '#FBFADA',
          200: '#ADBC9F',
          300: '#436850',
          400: '#12372A',
        },
      },
      fontFamily: {
        cinzel: 'cinzel',
        cinzelMedium: 'cinzel-medium',
        cinzelBold: 'cinzel-bold',
      },
    },
  },
}
