import React from "react";
import { program } from '../types'; 

interface ProgramProps {
    program: program
}


export default function Program({program}: ProgramProps){
    return (
        <div>
            <div>{program.name}</div>
            <div>{program.capacity}</div>
            {program.rank.map(el => {
                return (
                    <div>{el.name} - {el.offered.toString()} - {el.tentativeMatch.toString()}</div>
                )
            })}

        </div>
    )
}