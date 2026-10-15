export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cafe: {
          50: '#fbf6f0', 100: '#f3e6d6', 200: '#e6cdae',
          500: '#a9703c', 600: '#8a5a2e', 700: '#6f4624', 900: '#3b2414',
        },
      },
      fontFamily: { display: ['Georgia', 'serif'] },
    },
  },
  plugins: [],
}
