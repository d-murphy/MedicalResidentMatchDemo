import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'; 
import Link from '@mui/material/Link'; 
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
                        <Link href="https://en.wikipedia.org/wiki/Stable_marriage_problem">stable matching algorithm</Link>
                        &nbsp;to pair medical residency applicants with available positions.
                        This page demonstrates the stages of the algorithm, similar to this&nbsp;
                        <Link href="https://www.nrmp.org/matching-algorithm/">NRMP video</Link>.
                    </Box>
                </Stack>
                <Stack sx={{textAlign: "center", my:2, border: 1, borderRadius: 2, p:1}}>
                    <Box sx={{my:1}}>Match Status:</Box>
                    <Box sx={{backgroundColor: grey[300], py:2, borderRadius:1}}>{message}</Box>
                    <Stack direction="row" sx={{width: '100%', alignItems:'center', justifyContent: 'center', mt:2}}>
                        <Button sx={{mx:1}} variant="contained" onClick={() => dispatch('oneTurn')} disabled={solved} >Next Step</Button>
                        <Button sx={{mx:1}} variant="contained" onClick={() => dispatch('solve')} disabled={solved} >Solve (Skip to end)</Button>
                        <Button sx={{mx:1}} variant="contained" onClick={() => dispatch('reset')}>Reshuffle</Button>
                    </Stack>
                </Stack>

                <Box sx={{textAlign: 'center', my:2}}>
                    Applicants and their Program Ranking
                </Box>
                <Stack direction="row" alignItems="stretch" justifyContent="center">
                    {
                        applications.map(el => {
                            return <Applicant applicant={el} solved={solved}/>
                        })
                    }
                </Stack>
                <Box sx={{textAlign: 'center', my:2}}>
                    Programs and their applicant ranking
                </Box>
                <Stack direction="row" alignItems="stretch" justifyContent="center">
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

//Image by <a href="https://www.freepik.com/free-photo/top-view-network-concept_15292452.htm#from_view=detail_serie">Freepik</a>

export default App;
