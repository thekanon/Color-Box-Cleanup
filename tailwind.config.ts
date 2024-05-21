import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        red: "#FF6666", // 연한 빨간색
        green: "#33CC99", // 연한 녹색
        blue: "#6699FF", // 연한 파란색
        yellow: "#FFFF99", // 연한 노란색
        purple: "#C299FF", // 연한 보라색
        cyan: "#99FFFF", // 연한 시안색
        magenta: "#FF99FF", // 연한 자홍색
        orange: "#FFCC99", // 연한 주황색
        gray: "#CCCCCC", // 연한 회색
        olive: "#99CC66", // 연한 올리브색
        darkgreen: "#66CC66", // 연한 짙은 녹색
        steelblue: "#99CCFF", // 연한 감청색
        lime: "#CCFF99", // 연한 라임색
        pink: "#FFCCCC", // 연한 핑크색
        beige: "#FFF5E1", // 연한 베이지색
        teal: "#66CCCC", // 연한 청록색
      },
    },
  },
  plugins: [],
};
export default config;
