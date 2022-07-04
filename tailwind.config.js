module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        brand: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#D13C84',
          green: '#33CC95',
          red: '#E62E4D',
          white: '#FFFFFF',
          title: '#FD0056',
          text: '#969CB3',
          background: '#CECECE'
        }
      }
    },
  },
  plugins: [],
}
