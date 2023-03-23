import React from "react";
import { applicant } from "../types";
import Box from "@mui/material/Box"; 
import Stack from '@mui/material/Stack'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ThumbUp from "@mui/icons-material/ThumbUp"; 
import ThumbDown from "@mui/icons-material/ThumbDown"; 
import grey from "@mui/material/colors/grey";

interface ApplicantProps {
    applicant: applicant, 
    solved: boolean
}

export default function Applicant({applicant, solved}: ApplicantProps){
    return (
        <Stack sx={{
                border: 1, 
                borderColor: 'darkblue', 
                backgroundColor: 'lightblue', 
                boxShadow:1, 
                padding:2, 
                borderRadius:1, 
                m:1, 
                minWidth: '160px'
            }} alignItems="center" justifyContent='center'>
            <Box sx={{mb:2, fontSize: "large"}}><b>{applicant.name}</b></Box>
            {applicant.rank.map(el => {
                return (
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        <Box sx={{mr:1}}>{el.name}</Box> 
                        {
                            !el.offered ? <HorizontalRuleIcon /> : 
                                el.tentativeMatch ? 
                                    <ThumbUp className="iconPulse" sx={{color: 'darkgreen'}}/> : 
                                    <ThumbDown className="iconPulse" sx={{color: grey[700]}}/>
                        }
                    </Stack>
                )
            })}
            <Box sx={{flexGrow:2}} />
            {
                solved ? 
                    <Box className="" sx={{textAlign:"center", mt:2}}>Final Match:</Box> : 
                    <Box className="" sx={{textAlign:"center", mt:2}}>Tentative Match:</Box> 
            }
            <Box>{applicant.tentativeMatch || "TBD"}</Box>
        </Stack>
    )
}