import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {50:"#eff8f0",100:"#dcefdc",200:"#bedfbe",500:"#42934d",600:"#32783d",700:"#286331",800:"#204f28",900:"#173b1d"},
        ink: "#172019"
      },
      boxShadow: { soft: "0 8px 30px rgba(20,50,25,.06)" }
    }
  },
  plugins: []
};
export default config;