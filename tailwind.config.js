/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      playfair: ["Playfair", "serif"],
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
