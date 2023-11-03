/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      width: {
        '191': '191px',
        '259': '259px',
        '282': '282px',
        '287': '287px',
        '70': '70vw',
      },
      height: {
        '28': '28px',
        '54': '54px',
        '69.87': '69.87px',
        '100': '100px',
        '115': '115px',
        '90': '90px',
        '94': '94px',
        '380': '380px',
        '708': '708px',
      },
      colors: { 
        'pastel-yellow': '#F4D473',
        'mustard-yellow': '#F2C029',
        'olive-yellow': ' #BF9821',
        'light gray': '#EAEAEA',
        'marrom-form': '#736436',
        'cinza-meia-noite': '#343A40',
      },
      fontFamily: {
        body: ['Palanquin Dark']
      },
      boxShadow: {
        'custom': '4px 5px 10px 0 rgba(0, 0, 0, 0.5)'
      },
      margin: {
        '66': '66vw',
        '25': '25vw',
        '320': '320%',
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};


