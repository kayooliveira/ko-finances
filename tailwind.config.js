module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        brand: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#5429CC',
          green: '#33CC95',
          red: '#E62E4D',
          white: '#FFFFFF',
          title: '#363F5F',
          text: '#969CB3',
          background: '#F0F2F5'
        }
      }
    },
  },
  plugins: [],
}
