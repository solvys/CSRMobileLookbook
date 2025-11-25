/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['"Playfair Display"', 'serif'],
                cormorant: ['"Cormorant Garamond"', 'serif'],
            },
        },
    },
    plugins: [],
}
