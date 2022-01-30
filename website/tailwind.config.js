module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        seagreen: '#ACC9D1',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'system-ui'],
      // serif: ['Playfair Display', 'ui-serif'],
      serif: ['Miller', 'ui-serif'],
      mono: ['ui-monospace', 'SFMono-Regular'],
    },
  },
  plugins: [],
}
