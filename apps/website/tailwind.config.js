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
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['Noto Serif', 'ui-serif'],
      mono: ['ui-monospace', 'SFMono-Regular'],
    },
  },
  plugins: [],
}
