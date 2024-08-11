/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "my-columns": "9fr 3fr",
      },
      container: {
        padding: "25px",
      },
      colors: {
        "my-color": "rgba(217, 217, 217, 0.3)",
        "primary":'#1B1B1D',
        "lightMode":'#8395a7',
        "input":'#1E1E1E'
      },
    },
  },
  plugins: [],
};
