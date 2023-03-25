import Grid from "@mui/material/Grid"; 
import Box from '@mui/material/Box'; 
import Link from '@mui/material/Link'; 
import Button from "@mui/material/Button"; 
import React, { useState, useRef } from "react";
import MatchSection from "./components/MatchSection";
import backgroundImg from "./public/network.jpg"; 
import { defaultTheme, darkTheme } from "./Themes";
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const [theme, setTheme] = useState<typeof defaultTheme | typeof darkTheme>(defaultTheme); 
    const demoRef = useRef<HTMLDivElement>(null); 

    const scrollDemoToView = function(){
        if(demoRef?.current) demoRef.current.scrollIntoView({ behavior: "smooth" });
    }


    return (
        <ThemeProvider theme={theme}>
            <Box className="App">
                    
                <Grid container >
                    <Grid item sm={1} md={2} xl={3} sx={{backgroundColor: theme.secondary.light}}/>
                    <Grid item sm={10} md={8} xl={6}>
                        <Box sx={{position: 'relative'}}>
                            <Box
                                component="img"
                                src={backgroundImg} 
                                sx={{
                                width: '100%',
                                height: 'auto',
                                opacity: '0.3'
                            }}></Box>
                            <Box sx={{position: 'absolute', top: "20px", left: "10px"}}>
                                <Box sx={{fontSize:'large'}}>
                                    The Match, a Demo
                                </Box>
                                <Box sx={{fontSize: 'small'}}>
                                    See the stages of the algorithm behind the medical residency match.  Read more about the&nbsp;
                                    <Link href="https://en.wikipedia.org/wiki/Stable_marriage_problem" target="_blank">algo</Link> or at the&nbsp;
                                    <Link href="https://www.nrmp.org/intro-to-the-match/how-matching-algorithm-works/" target="_target">match</Link> site.
                                </Box>
                            </Box>
                            <Box sx={{position: 'absolute', bottom: "20px", left: "10px"}}>
                                <Button variant="contained" color="primary" onClick={scrollDemoToView}>See the Demo</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={1} md={2} xl={3} sx={{backgroundColor: theme.secondary.light}}/>
                </Grid>

                <MatchSection demoRef={demoRef}/>
            </Box>
        </ThemeProvider>
    );
}

//Image by <a href="https://www.freepik.com/free-photo/top-view-network-concept_15292452.htm#from_view=detail_serie">Freepik</a>

export default App;
