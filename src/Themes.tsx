import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
      primary: {
        dark: string; 
        main: string;
        light: string; 
      };
      secondary: {
        dark: string; 
        main: string
        light: string; 
      }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
      primary?: {
        dark?: string; 
        main?: string;
        light?: string; 
      };
      secondary: {
        dark?: string; 
        main?: string;
        light?: string; 
      }
    }
  }

export const defaultTheme = createTheme({
    primary: {
        dark: '#00005a', 
        main: '#003977',
        light: "#d4daea"
    },
    secondary: {
        dark: '#6c3200', 
        main: '#8d6500',
        light: "#eae4d4"
    }
    
});

export const darkTheme = createTheme({
    primary: {
        dark: '#b9ac3c', 
        main: '#d7cf77',
        light: "#eee9c1"
    },
    secondary: {
        dark: '#383eb7', 
        main: '#777fd7',
        light: "#c5c7ee"
    }
});