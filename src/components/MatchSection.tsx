import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'; 
import React, { useReducer } from "react";
import Applicant from "../components/Applicant";
import Program from "../components/Program";
import { reducer, getRandomState } from "../MatchLogic";
import grey from "@mui/material/colors/grey";

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

    return (
        <>
            <Stack sx={{ textAlign: "center", my: 2, border: 1, borderRadius: 2, p: 1 }} ref={demoRef}>
                <Box sx={{ my: 1 }}>Match Status:</Box>
                <Box sx={{ backgroundColor: grey[300], py: 2, borderRadius: 1 }}>{message}</Box>
                <Stack direction="row" sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Button sx={{ mx: 1 }} variant="contained" onClick={() => dispatch('oneTurn')} disabled={solved} >Next Step</Button>
                    <Button sx={{ mx: 1 }} variant="contained" onClick={() => dispatch('solve')} disabled={solved} >Solve (Skip to end)</Button>
                    <Button sx={{ mx: 1 }} variant="contained" onClick={() => dispatch('reset')}>Reshuffle</Button>
                </Stack>
            </Stack>

            <Box sx={{ textAlign: 'center', my: 2 }}>
                Applicants and their Program Ranking
            </Box>
            <Stack direction="row" alignItems="stretch" justifyContent="center">
                {
                    applications.map(el => {
                        return <Applicant applicant={el} solved={solved} />
                    })
                }
            </Stack>
            <Box sx={{ textAlign: 'center', my: 2 }}>
                Programs and their applicant ranking
            </Box>
            <Stack direction="row" alignItems="stretch" justifyContent="center" sx={{mb:5}}>
                {
                    Object.keys(programs).map(el => {

                        return <Program program={programs[el]} />
                    })
                }
            </Stack>
        </>
    )
}

