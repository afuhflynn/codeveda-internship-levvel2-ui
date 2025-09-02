/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          "v-light-gray": "hsl(0, 0%, 98%)",
          "v-light-gray-blue": "hsl(236, 33%, 92%)",
          "light-gray-blue": "hsl(233, 11%, 84%)",
          "dark-gray-blue": "hsl(236, 9%, 61%)",
          "v-dark-gray-blue": "hsl(235, 19%, 35%)",
          "light-gray-blue-hovered": "hsl(233, 11%, 91%)",
        },
        dark: {
          "v-dark-blue": "hsl(235, 21%, 11%)",
          "v-dark-desaturated-blue": "hsl(235, 24%, 19%)",
          "light-gray-blue": "hsl(234, 11%, 60%)",
          "dark-gray-blue": "hsl(234, 11%, 52%)",
          "light-gray-blue-hovered": "hsl(236, 33%, 92%)",
        },
        hovered: {
          primary: "hsl(233, 14%, 35%)",
          secondary: "hsl(237, 14%, 26%)",
        },
        "active-text": "hsl(220, 98%, 61%)",
        "main-gradient": "var(--main-gradient)",
      },
      width: {
        main: "var(--main-width)",
      },
      height: {
        main: "var(--main-height)",
      },
      fontSize: {
        "body-text": "18px",
      },
      fontFamily: {
        main: "sans-serif, POPPINS",
      },
      fontWeight: {
        small: "400",
        large: "700",
      },
      backgroundImage: {
        "desktop-dark-bg-img": "var(--dark-background-desktop)",
        "desktop-light-bg-img": "var(--light-background-desktop)",
        "main-gradient": "var(--main-gradient)",
        "copy-btn": "var(--copy-btn)",
      },
      padding: {
        paddingX: "var(--padding-x)",
      },
    },
  },
  plugins: [],
};
