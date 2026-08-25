/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector', // 👈 Agrega esto para el modo oscuro/claro
  theme: {
    extend: {},
  },
  plugins: [],
}