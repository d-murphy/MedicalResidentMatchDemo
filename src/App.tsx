import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'; 
import React, { useReducer } from "react";
import Applicant from "./components/Applicant";
import Program from "./components/Program";
import { reducer, getRandomState } from "./reducer";
import grey from "@mui/material/colors/grey";

function App() {
    const [state, dispatch] = useReducer(reducer, [getRandomState()])
    const lastTurn = state[state.length - 1];
    const applications = lastTurn.applications;
    const programs = lastTurn.programs;
    const message = lastTurn.message;
    const solved = lastTurn.solved;
    return (
        <Box className="App">
            <Stack>
                <Stack sx={{backgroundColor: 'lightskyblue', p:2, borderRadius:1}}>
                    <Box 
                        sx={{
                            textAlign: "center", 
                            fontSize: 'xx-large', 
                            my:2
                        }}>
                        Match Algorithm Demo for Medical Residents
                    </Box>
                    <Box sx={{textAlign: "center"}}>
                        The National Resident Match Program uses a version of the&nbsp;
                        <a href="https://en.wikipedia.org/wiki/Stable_marriage_problem">stable matching algorithm</a>
                        &nbsp;to pair medical residency applicants with available positions.
                        This page demonstrates the stages of the algorithm, similar to&nbsp;
                        <a href="https://www.nrmp.org/matching-algorithm/">this video</a> on the NRMP site.
                    </Box>
                </Stack>
                <Stack sx={{textAlign: "center", my:2, border: 1, borderRadius: 2, p:1}}>
                    <Box sx={{my:1}}>Match Status:</Box>
                    <Box sx={{backgroundColor: grey[300], p:2, borderRadius:1}}>{message}</Box>
                </Stack>
                <Stack direction="row" sx={{width: '100%', alignItems:'center', justifyContent: 'center'}}>
                    <Button sx={{mx:1}} variant="contained" onClick={() => dispatch('oneTurn')} disabled={solved} >Next Step</Button>
                    <Button sx={{mx:1}} variant="contained" onClick={() => dispatch('solve')} disabled={solved} >Solve (Skip to end)</Button>
                    <Button sx={{mx:1}} variant="contained" onClick={() => dispatch('reset')}>Reshuffle</Button>
                </Stack>

                <Box sx={{textAlign: 'center', my:2}}>
                    Applicants and their Program Ranking
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    {
                        applications.map(el => {
                            return <Applicant applicant={el} />
                        })
                    }
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="center">
                    {
                        Object.keys(programs).map(el => {

                            return <Program program={programs[el]} />
                        })
                    }
                </Stack>

            </Stack>
        </Box>
    );
}

export default App;
