import React from "react";
import { applicant } from "../types";
import Box from "@mui/material/Box"; 
import Stack from '@mui/material/Stack'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ThumbUp from "@mui/icons-material/ThumbUp"; 
import ThumbDown from "@mui/icons-material/ThumbDown"; 
import grey from "@mui/material/colors/grey";

interface ApplicantProps {
    applicant: applicant
}

export default function Applicant({applicant}: ApplicantProps){
    return (
        <Stack sx={{border: 1, borderColor: 'lightgreen', padding:2, borderRadius:1, m:1}} alignItems="center" justifyContent='center'>
            <Box sx={{my:2}}>{applicant.name}</Box>
            <Box sx={{flexGrow:2}} />
            {applicant.rank.map(el => {
                return (
                    <Stack direction="row" justifyContent="center">
                        <Box>{el.name}</Box> 
                        {
                            !el.offered ? <HorizontalRuleIcon /> : 
                                el.tentativeMatch ? 
                                    <ThumbUp className="changeAnimation" sx={{color: 'darkgreen'}}/> : 
                                    <ThumbDown className="changeAnimation" sx={{color: grey[700]}}/>
                        }
                    </Stack>
                )
            })}
            <Box sx={{textAlign:"center"}}>Tentative Match: {applicant.tentativeMatch || "TBD"}</Box>
        </Stack>
    )
}