/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./stores/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media", // or 'class' if you're using a toggle
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Nunito", "sans-serif"], // use CSS variable here too
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
