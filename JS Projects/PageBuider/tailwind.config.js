/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './index.html',
    './scripts/**/*.js',
    './style/**/*.css',
  ],

  theme: {
    extend: {
      colors: {
        'button-color': 'rgb(29, 200, 417)',
      },
      fontFamily: {
        'assistant': ['assistant', 'sans-serif'],
      },
      zIndex: {
        'id': '2'
      }
    },
  },
  plugins: [],
}

