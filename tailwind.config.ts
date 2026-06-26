import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdfbeb",
          100: "#faf3c0",
          200: "#f6e483",
          300: "#f0cf45",
          400: "#e9b91f",
          500: "#d49812",
          600: "#b37010",
          700: "#8e4f12",
          800: "#763f15",
          900: "#653417",
          950: "#3a1b07",
        },
        dark: {
          50:  "#111827",  // gray-900 — darkest text
          100: "#1f2937",  // gray-800
          200: "#374151",  // gray-700
          300: "#4b5563",  // gray-600
          400: "#6b7280",  // gray-500 — muted text
          500: "#9ca3af",  // gray-400
          600: "#d1d5db",  // gray-300 — borders
          700: "#e5e7eb",  // gray-200 — subtle borders
          800: "#f3f4f6",  // gray-100 — card backgrounds
          900: "#f9fafb",  // gray-50  — section backgrounds
          950: "#ffffff",  // white    — page background
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-luxury":
          "linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f9fafb 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #d49812 0%, #f0cf45 50%, #b37010 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        luxury: "0 8px 40px -8px rgba(0, 0, 0, 0.12)",
        gold: "0 0 30px rgba(212, 152, 18, 0.25)",
        card: "0 2px 16px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
