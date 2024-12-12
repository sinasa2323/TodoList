/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'mainBack1' : "url('../img/mainBack1.jpg')",
        'importantBack' : "url('../img/importantBack.jpg')",
      }
    },
  },
  plugins: [],
}

