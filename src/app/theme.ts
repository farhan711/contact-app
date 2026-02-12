"use client";

import { createTheme } from "@mui/material/styles";

const ACCENT = "#60a5fa";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: ACCENT,
    },
    secondary: {
      main: ACCENT,
    },
    background: {
      default: "#0a0a1a",
      paper: "rgba(255, 255, 255, 0.05)",
    },
    text: {
      primary: "#f0f0f0",
      secondary: "#a0a0b8",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.07)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.07)",
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "12px 12px 0 0",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          backgroundColor: "rgba(20, 20, 40, 0.85)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(96, 165, 250, 0.1)",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
