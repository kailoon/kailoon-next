module.exports = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Sorts Mill Goudy', 'serif'],
      },
      fontSize: {
        base: ['18px', '27px'],
      },
      animation: {
        fade: 'fadeIn 350ms ease-in-out',
      },
      keyframes: (theme) => ({
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
