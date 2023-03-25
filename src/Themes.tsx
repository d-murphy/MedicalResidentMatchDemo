import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#f4e5c8',
        },
        secondary: {
            main: '#568be1',
        },
        success: {
            main: "#237728"
        }, 
        warning: {
            main: "#bd3829"
        }    
    }
})

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#d7cf77',
        },
        secondary: {
            main: '#777fd7',
        }

    }
});