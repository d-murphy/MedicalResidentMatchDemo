import React from "react";

interface SchoolProps {
    name: string, 
    ranking: {
        name: string
    }[]
}

export default function School({name, ranking}: SchoolProps){
    return (
        <div>
            <div>{name}</div>
            {ranking.map(el => {
                return (
                    <div>{el.name}</div>
                )
            })}

        </div>
    )
}