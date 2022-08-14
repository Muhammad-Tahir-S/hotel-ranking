import type { Theme } from "theme-ui";

export const theme: Theme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#111214",
    bgGrey: "#F7F9FA",
    primary: "#FA831A",
    secondary: "#00A781",
    muted: "#DADEE3",
  },
  buttons: {
    primary: {
      minHeight: "fit-content",
      fontSize: "14px",
      backgroundColor: "primary",
      fontWeight: "bold",
      px: "30px",
      cursor: "pointer",
      "&:hover": {
        bg: "secondary",
      },
    },
    secondary: {
      fontSize: "14px",
      backgroundColor: "secondary",
      fontWeight: "bold",
      px: "30px",
      cursor: "pointer",
    },
    muted: {
      fontSize: "12px",
      backgroundColor: "muted",
      fontWeight: "bold",
      color: "black",
      p: "3px",
      textTransform: "uppercase",
    },
  },
};
