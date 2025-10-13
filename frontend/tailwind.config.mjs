/** @type {import('tailwindcss').Config} */
import daisyui from '.daisyui';
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
    ],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["halloween"], // You can choose other themes as well
    },
};