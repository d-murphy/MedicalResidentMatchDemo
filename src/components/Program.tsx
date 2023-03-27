import React from "react";
import { program } from '../types'; 
import CheckIcon from "@mui/icons-material/Check"; 
import ClearIcon from "@mui/icons-material/Clear"; 
import Box from "@mui/material/Box"; 
import Stack from '@mui/material/Stack'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useTheme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';




interface ProgramProps {
    program: program
}


export default function Program({program}: ProgramProps){

    const theme = useTheme(); 
    return (

        <Card sx={{ mx:1, width: '100%', display: 'flex', justifyContent: 'start' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[300], height: '35px', width: '35px' }} aria-label="applicant-icon">
                        <LocalHospitalIcon fontSize="medium" />
                    </Avatar>
                }
                title={<Box component="span" sx={{fontSize:'large'}}>{program.name}</Box>}
            />
            <CardContent >
                <Box sx={{fontSize: 'small', mb:2}}><i>Capacity: {program.capacity}</i></Box>
                {program.rank.map((el, ind) => {
                    return (
                        <Stack direction="row" justifyContent='space-between' alignItems="center">
                            <Box sx={{mr:1, fontSize: 'small'}}>{ind+1}. {el.name}</Box> 
                            {
                                el.tentativeMatch ? 
                                    <CheckIcon className="iconPulse" sx={{color: theme.palette.success.main}}/> :
                                    el.offered ? <ClearIcon className="iconPulse" sx={{color: theme.palette.warning.main}} /> : <HorizontalRuleIcon />
                            }
                        </Stack>
                    )
                })}
            </CardContent>
        </Card>

    )
}