import React from "react";
import { applicant } from "../types";
import Box from "@mui/material/Box"; 
import Stack from '@mui/material/Stack'; 
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ThumbUp from "@mui/icons-material/ThumbUp"; 
import ThumbDown from "@mui/icons-material/ThumbDown"; 
import grey from "@mui/material/colors/grey";
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';



interface ApplicantProps extends IconButtonProps {
    applicant: applicant, 
    solved: boolean
}
  

export default function Applicant({applicant, solved}: ApplicantProps){
    const theme = useTheme(); 
    return (

        <Card sx={{ mx:1, width: '100%' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[200], height: '35px', width: '35px' }} aria-label="applicant-icon">
                        <PersonIcon fontSize="large" />
                    </Avatar>
                }
                title={<Box component="span" sx={{fontSize:'large'}}>{applicant.name}</Box>}
            />
            <CardContent >
                {applicant.rank.map((el, ind) => {
                    return (
                        <Stack direction="row" justifyContent='space-between' alignItems="center">
                            <Box sx={{mr:1, fontSize: 'small'}}>{ind+1}. {el.name}</Box> 
                            {
                                !el.offered ? <HorizontalRuleIcon /> : 
                                    el.tentativeMatch ? 
                                        <ThumbUp className="iconPulse" sx={{color: theme.palette.success.main}}/> : 
                                        <ThumbDown className="iconPulse" sx={{color: theme.palette.warning.main}}/>
                            }
                        </Stack>
                    )
                })}
            </CardContent>
            <Box sx={{flexGrow:2}} />
            <CardActions>
                <Stack alignItems="center" justifyContent="center" sx={{width: '100%'}}>
                {
                    solved ? 
                        <Box className="" sx={{textAlign:"center", mt:2}}>Final Match:</Box> : 
                        <Box className="" sx={{textAlign:"center", mt:2}}>Tentative Match:</Box> 
                }
                <Box>{applicant.tentativeMatch || "TBD"}</Box>

                </Stack>

            </CardActions>
        </Card>

    )
}

