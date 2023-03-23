import React from "react";
import { program } from '../types'; 
import Box from "@mui/material/Box"; 
import Stack from '@mui/material/Stack'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CheckIcon from "@mui/icons-material/Check"; 
import ClearIcon from "@mui/icons-material/Clear"; 
import grey from "@mui/material/colors/grey";


interface ProgramProps {
    program: program
}


export default function Program({program}: ProgramProps){
    return (
        <Stack sx={{
                border: 1, 
                borderColor: 'darkgrean', 
                backgroundColor: 'lightgreen', 
                boxShadow:1, 
                padding:2, 
                borderRadius:1, 
                m:1, 
                minWidth: '160px'
            }} alignItems="center" justifyContent='center'>
            <Box sx={{mb:2, fontSize: "large"}}><b>{program.name}</b></Box>
            <Box sx={{fontSize: 'small', mb:2}}><i>Capacity: {program.capacity}</i></Box>
            {program.rank.map(el => {
                return (
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Box sx={{mr:1}}>{el.name}</Box> 
                        {
                            el.tentativeMatch ? 
                            <CheckIcon className="iconPulse" sx={{color: 'darkgreen'}}/> :
                            el.offered ? <ClearIcon className="iconPulse" sx={{color: 'darkred'}} /> : <HorizontalRuleIcon />
                        }
                    </Stack>
                )
            })}
            <Box sx={{flexGrow:2}} />
        </Stack>
 


    )
}