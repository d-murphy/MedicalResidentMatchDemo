export const initialState = {
    solved: false, 
    systemMessage: "Applicant and Program rankings are set.  Play the first turn in the matching algorithm or solve to see the end result.",
    applicants: [
        {name: "Arthur", tentativeMatch: '', stable: false, rank: [
            {name:"Mercy", offered: false, tentMatch: false}
        ]}, 
        {name: "Sunny", tentativeMatch: '', stable: false, rank: [
            {name:"Mercy", offered: false, tentMatch: false}, 
            {name:"City", offered: false, tentMatch: false}
        ]}, 
        {name: "Joseph", tentativeMatch: '', stable: false, rank: [
            {name:"Mercy", offered: false, tentMatch: false},
            {name: "City", offered: false, tentMatch: false},
            {name:"General", offered: false, tentMatch: false}
        ]}, 
        {name: "Latha", tentativeMatch: '', stable: false, rank: [
            {name:"Mercy", offered: false, tentMatch: false}, 
            {name:"City", offered: false, tentMatch: false}
        ]}, 
        {name: "Darrius", tentativeMatch: '', stable: false, rank: [
            {name:"City", offered: false, tentMatch: false}
        ]}
    ], 
    programs: {
        "Mercy": {name: "Mercy", capacity: 2, rank: [
            {name:"Joseph", offered: false, tentMatch: false}, 
            {name:"Arthur", offered: false, tentMatch: false}, 
        ]},
        "City": {name: "City", capacity: 2, rank: [
            {name:"Darrius", offered: false, tentMatch: false}, 
            {name:"Arthur", offered: false, tentMatch: false}, 
            {name:"Sunny", offered: false, tentMatch: false}, 
            {name:"Latha", offered: false, tentMatch: false}, 
            {name:"Joseph", offered: false, tentMatch: false}, 
        ]}, 
        "General": {name: "General", capacity: 2, rank: [
            {name:"Darrius", offered: false, tentMatch: false}, 
            {name:"Arthur", offered: false, tentMatch: false}, 
            {name:"Joseph", offered: false, tentMatch: false}, 
            {name:"Latha", offered: false, tentMatch: false}, 
        ]}
    }
}