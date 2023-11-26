/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#AE1143' , // Background color
        secondary:'#FAF1D2' , // Button color
        tertiary:'#FDD2B3',
      },
      width :{
           custom1: '64%',
           custom2: '34%',
      },
    },

  },
  plugins: [],
}

