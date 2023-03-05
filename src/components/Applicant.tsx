import React from "react";

interface ApplicantProps {
    name: string, 
    rankings: {
        school: string, 
        offerred: boolean, 
        tentativeAccept: boolean
    }[]
}

export default function Applicant({name, rankings}: ApplicantProps){
    return (
        <div>
            <div>{name}</div>
            {rankings.map(el => {
                return (
                    <div>{el.school} - {el.offerred.toString()} - {el.tentativeAccept.toString()}</div>
                )
            })}
        </div>
    )
}