module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      keyframes: {
        'slide-in-bottom': {
          '0%': {
            transform: 'translateY(40%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        }
      },
      animation: {
        'slide-from-bottom': 'slide-in-bottom 0.3s ease-in-out',
      },
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
