export type actions = 'reset' | 'oneTurn' | 'solve'; 
export type turn = {
    solved: boolean, 
    message: string, 
    applications: applicant[], 
    programs: {[index: string]: program}
}

export type applicant = {
    name: string, 
    tentativeMatch: string, 
    stable: boolean, 
    rank: {
        name: string, 
        offered: boolean, 
        tentativeMatch: boolean
    }[]
}

export type program = {
    name: string, 
    capacity: number, 
    rank: {
        name: string, 
        offered: boolean, 
        tentativeMatch: boolean
    }[]
}