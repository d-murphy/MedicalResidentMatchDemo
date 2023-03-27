import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'; 
import React, { useReducer } from "react";
import Applicant from "../components/Applicant";
import Program from "../components/Program";
import { reducer, getRandomState } from "../MatchLogic";
import grey from "@mui/material/colors/grey";
import Grid from '@mui/material/Grid'; 
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FastForwardIcon from '@mui/icons-material/FastForward';
import RepeatIcon from '@mui/icons-material/Repeat';

interface MatchSectionProps {
    demoRef: React.Ref<HTMLDivElement>; 
}

export default function MatchSection({demoRef}: MatchSectionProps) {
    const [state, dispatch] = useReducer(reducer, [getRandomState()])
    const lastTurn = state[state.length - 1];
    const applications = lastTurn.applications;
    const programs = lastTurn.programs;
    const message = lastTurn.message;
    const solved = lastTurn.solved;

    let firstUnstable = -1;  

    return (
        <Grid container>
            <Grid item md={4} sm={12}>
                <Stack sx={{ textAlign: "center", my: 2, backgroundColor: grey[100], borderRadius:2, boxShadow:1, padding: 2 }} ref={demoRef}>
                    <Stack sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                        <Button sx={{ m: 1, width: '250px' }} variant="contained" onClick={() => dispatch('oneTurn')} disabled={solved} color="secondary" >
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <Box component='span' sx={{mr:.5}}>{state.length===1 ? "Start" : "Next Step" }</Box>
                                <SkipNextIcon />
                            </Stack>
                        </Button>
                        <Button sx={{ m: 1, width: '250px' }} variant="contained" onClick={() => dispatch('solve')} disabled={solved} color="secondary" >
                            <Box component='span' sx={{mr:.5}}>Solve (Skip to end)</Box>
                            <FastForwardIcon />
                        </Button>
                        <Button sx={{ m: 1, width: '250px' }} variant="contained" onClick={() => dispatch('reset')} color="secondary">
                            <Box component='span' sx={{mr:.5}}>Reshuffle</Box>
                            <RepeatIcon />
                        </Button>
                    </Stack>
                    <Box sx={{ mb: 1, mt:5 }}>Match Status:</Box>
                    <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1, minHeight: '60px', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign:'center' }}>
                        <Box>
                            {message}
                        </Box>
                    </Box>

                </Stack>
            </Grid>
            <Grid item md={8} sm={12}>


                <Box sx={{ textAlign: 'center', m: 2, backgroundColor: grey[100], borderRadius:2, boxShadow:1, padding: 2 }}>
                    Applicants and their Program Ranking
                    <Stack direction="row" alignItems="stretch" justifyContent="center" sx={{mt: 3}}>
                        {
                            applications.map((el, ind) => {
                                if(firstUnstable < 0 && !el.stable) firstUnstable = ind; 
                                return <Applicant applicant={el} solved={solved} firstUnstable={firstUnstable === ind}/>
                            })
                        }
                    </Stack>
                </Box>
                <Box sx={{ textAlign: 'center', m: 2, backgroundColor: grey[100], borderRadius:2, boxShadow:1, padding: 2 }}>
                    Programs and their Applicant Ranking
                    <Stack direction="row" alignItems="stretch" justifyContent="center" sx={{my:2}}>
                        {
                            Object.keys(programs).map(el => {

                                return <Program program={programs[el]} />
                            })
                        }
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    )
}

