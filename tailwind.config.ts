import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
  extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      primary: {
        DEFAULT: "#0EA5E9", // Your teal color
        hover: "#0284C7",
      },
      background: {
        DEFAULT: "#1a202c",
        light: "#2D3748",
      },
      text: {
        DEFAULT: "#F7FAFC",
        muted: "#A0AEC0",
      },
    },
  },
} satisfies Config;
