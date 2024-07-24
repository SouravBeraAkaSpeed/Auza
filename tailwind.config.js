/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nasa: ["nasa-font", "sans-serif"],
        psemi: ["poppins-semibold", "sans-serif"],
        pregular: ["poppins-regular", "sans-serif"],
      },
      colors: {
        purple: "#8C66F7",
        brand: {
          100: "#e0aaff",
          200: "#c77dff",
          300: "#9d4edd",
          400: "#7b2cbf",
          500: "#5a189a",
          600: "#3c096c",
          700: "#240046",
          800: "#10002b",
        },
        dark: "#2b2d42",
        green: "#2b2d42",
      },
    },
  },
  plugins: [],
};
