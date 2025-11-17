/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
 content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'mainBack1' : "url('../img/mainBack1.jpg')",
        'mainBack2' : "url('../img/mainBack2.jpeg')",
        'importantBack' : "url('../img/importantBack.jpg')",
      }
    },
  },
  plugins: [],
}

