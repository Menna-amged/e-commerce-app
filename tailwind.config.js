/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
   
    extend: {
      backgroundImage: {
        "main-background": "url('/src/assets/images/light-patten.svg')",
      },
      colors: {
        main: "#0AAD0A",
        "main-hover": "#066806",
      },
      screens: {
        s: "320px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

