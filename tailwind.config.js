/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns:{
        'my-columns':'9fr 3fr'
      },
      container:{
        'padding':'25px'
      },
      colors:{
        'my-color':"rgba(217, 217, 217, 0.3)"
      },
    },
  },
  plugins: [],
}

