/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0033',
        'primary-dark': '#CC0029',
        'text-dark': '#1A1A1A',
        'text-light': '#666666',
        'background': '#FFFFFF',
        'gray-light': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1' }],
        'h1': ['3.5rem', { lineHeight: '1.2' }],
        'h2': ['2.5rem', { lineHeight: '1.3' }],
        'h3': ['2rem', { lineHeight: '1.4' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
      },
      spacing: {
        'section': '6rem',
      },
      maxWidth: {
        'container': '1280px',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
} 