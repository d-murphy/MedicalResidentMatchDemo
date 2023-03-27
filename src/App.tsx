import Grid from "@mui/material/Grid"; 
import Box from '@mui/material/Box'; 
import Button from "@mui/material/Button"; 
import React, { useState, useRef } from "react";
import MatchSection from "./components/MatchSection";
import headerImg from "./public/network.jpg"; 
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
            <Box className="App" >
                    
                <Grid container >
                    <Grid item sm={1} md={2} xl={3} sx={{backgroundColor: theme.palette.primary.light, opacity: '.4', mb: "3px"}}/>
                    <Grid item sm={10} md={8} xl={6} >
                        <Box sx={{position: 'relative'}}>
                            <Box
                                component="img"
                                src={headerImg} 
                                sx={{
                                width: '100%',
                                height: 'auto',
                                opacity: '0.3'
                            }}></Box>
                            <Box sx={{position: 'absolute', top: "20px", left: "10px"}}>
                                <Box sx={{fontSize:'x-large', mb:3}}>
                                    Medical Residency Match Demonstration
                                </Box>
                                <Box sx={{fontSize: 'medium'}}>
                                    See the stages of the algorithm behind the medical residency match.&nbsp;&nbsp;
                                    {/* Read more about the&nbsp;
                                    <Link href="https://en.wikipedia.org/wiki/Stable_marriage_problem" target="_blank" color="secondary">algo</Link> or at the&nbsp;
                                    <Link href="https://www.nrmp.org/intro-to-the-match/how-matching-algorithm-works/" target="_target"  color="secondary">match</Link> site. */}
                                </Box>
                            </Box>
                            <Box sx={{position: 'absolute', bottom: "20px", left: "10px"}}>
                                <Button variant="contained" color="secondary" onClick={scrollDemoToView} >See the Demo</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={1} md={2} xl={3} sx={{backgroundColor: theme.palette.primary.light, opacity: '.6', mb:"3px"}}/>
                </Grid>

                <Box sx={{my:5}}>&nbsp;</Box>
                <Box sx={{my: 5}}>
                    <MatchSection demoRef={demoRef} />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
export default App;

//Image by <a href="https://www.freepik.com/free-photo/top-view-network-concept_15292452.htm#from_view=detail_serie">Freepik</a>

