import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: { transform: "translateY(-500px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-down": "slideDown 0.5s ease-out",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
