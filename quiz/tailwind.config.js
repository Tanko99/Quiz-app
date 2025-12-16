/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",      // 👈 VERY IMPORTANT
    "./*.html",
    "./src/**/*.{js,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        accent: "#ff9e0b",
      },
    },
  },
  plugins: [],
};