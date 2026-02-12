"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Roboto, Arial, sans-serif",
  },
});

export default theme;
