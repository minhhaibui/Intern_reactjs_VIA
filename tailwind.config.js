/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        Tblack: "#191D23",
        TbackModal: "#0D0F11",
        Tgray: "#A0ABBB",
        Tyellow: "#FDBA4D",

        Tfooter: "#DCA245 ",
        Tgreen: "#19B88B",
        Tred: "#DC2626",
        Tblue: "#0179ED",
        Tpink: "#FFF2F2",
        BgGray: "#F7F8F9",
      },
      spacing: {
        "1/4-minus-24": "calc(25% - 24px)", // 100%/4 - 24px
        "1/2-minus-24": "calc(50% - 24px)", // 100%/2 - 24px
        "1/3-minus-24": "calc((100% / 3) - 24px)", // 100%/3 - 24px
        "1/6-minus-16": "calc((100% / 6) - 16px)",
      },
    },
  },
  plugins: [],
};
