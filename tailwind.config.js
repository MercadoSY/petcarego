/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/pattern.svg')",
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Fredoka', 'sans-serif'],
      },
      colors: {
        brandOrange: '#ffa252',
        brandBlue: {
          100: '#e0f4ff',
          300: '#b2e1ff',
          500: '#5fceff',
          600: '#3dabfc',
        },
        themeBlue: {
          400: '#c0e7ff', // Corrected invalid hex code
        },
        darkOrange: {
          300: '#ffc977',
          500: '#fb923c',
          600: '#f97316',
        },
        purple: {
          100: '#f3e8ff',
          300: '#d8b4fe',
          500: '#a855f7',
          600: '#9333ea',
        },
      },
      boxShadow: {
        'glow-orange': '0 0 20px 0 rgba(251, 146, 60, 0.5)', // darkOrange-500
        'glow-blue': '0 0 20px 0 rgba(95, 206, 255, 0.5)', // brandBlue-500
        'glow-purple': '0 0 20px 0 rgba(168, 85, 247, 0.5)', // purple-500
      },
      dropShadow: {
        title: '0 3px 0px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};