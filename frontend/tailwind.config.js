/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e3f2fd",
          100: "#bbdefb",
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3",
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
        },
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
        success: {
          50: "#e8f5e8",
          100: "#c8e6c9",
          500: "#4caf50",
          600: "#43a047",
        },
        error: {
          50: "#ffebee",
          100: "#ffcdd2",
          500: "#f44336",
          600: "#e53935",
        },
        warning: {
          50: "#fff3e0",
          100: "#ffe0b2",
          500: "#ff9800",
          600: "#fb8c00",
        },
        text: {
          primary: "#172b4d",
          secondary: "#5e6c84",
          muted: "#97a0af",
          inverse: "#ffffff",
        },
        bg: {
          primary: "#ffffff",
          secondary: "#f4f5f7",
          tertiary: "#ebecf0",
          overlay: "rgba(9, 30, 66, 0.54)",
        },
        border: {
          primary: "#dfe1e6",
          secondary: "#c1c7d0",
          focus: "#4c9aff",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0, 0, 0, 0.08)",
        jira: "0 1px 2px 0 rgba(9, 30, 66, 0.08)",
        "jira-md": "0 4px 8px -2px rgba(9, 30, 66, 0.15)",
        "jira-lg": "0 8px 16px -4px rgba(9, 30, 66, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
