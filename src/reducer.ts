import { turn, program } from './types'; 

type actions = 'reset' | 'oneTurn' | 'solve'; 
export function reducer(state:turn[], action:actions):turn[]{

    if(action === 'reset'){
        return [getRandomState()]
    }
    if(action === 'oneTurn') {
        return oneTurn(state); 
    }
    if(action === 'solve') {
        let solved = false; 
        let newState = state; 
        while(!solved){
            newState = oneTurn(newState); 
            solved = newState[newState.length-1].solved; 
        }
        return newState; 
    }
    throw new Error("unknown action"); 
}

const programNames = ['Mercy', 'City', 'General']; 
const applicantNames = ['Arthur', 'Sunny', 'Joseph', 'Latha', 'Darrius']

function getRandomOrder (optionsArr:string[]) {
    let randomChoices = []
    const optionsArrLength = optionsArr.length;
    for(let i=0; i<optionsArrLength; i++){
        randomChoices.push(Math.floor(Math.random() * optionsArrLength))
    }
    let choicesUnique = Array.from(new Set(randomChoices))
    let returnArr = [];
    for(let i=0; i<choicesUnique.length; i++){
        returnArr.push({name:optionsArr[choicesUnique[i]], offered: false, tentativeMatch: false})
    }
    return returnArr;
}

function getRandomCapacity(){
    let returnInt = Math.random()<.6 ? 2 : 1;
    return returnInt
}

export function getRandomState():turn  {
    let newState: turn = {
        solved: false, 
        message: "Applicant and Program rankings are set.  Play the first turn in the matching algorithm or solve to see the end result.",
        applications: [
            {name: "Arthur", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Sunny", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Joseph", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Latha", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}, 
            {name: "Darrius", tentativeMatch: '', stable: false, rank: getRandomOrder(programNames)}
        ], 
        programs: {
            "Mercy": {name: "Mercy", capacity: getRandomCapacity(), rank: getRandomOrder(applicantNames)},
            "City": {name: "City", capacity: getRandomCapacity(), rank: getRandomOrder(applicantNames)}, 
            "General": {name: "General", capacity: getRandomCapacity(), rank: getRandomOrder(applicantNames)}
        }
    }
    return newState
} 

function oneTurn(currentState:turn[]){
    const lastTurn = currentState[currentState.length-1]; 
    let newTurn:turn = JSON.parse(JSON.stringify(lastTurn));

    const applicantIndex = findFirstUnstableApplicant(newTurn);
    if(applicantIndex === -1){
        newTurn.solved = true;
        newTurn.message = "The match is complete."
        return [...currentState, newTurn]; 
    }
    const programToCheckIndex = findFirstUnofferedProgram(newTurn, applicantIndex);
    if(programToCheckIndex === -1){
        newTurn.applications[applicantIndex].tentativeMatch = "No Match";
        newTurn.applications[applicantIndex].stable = true;
        newTurn.message = newTurn.applications[applicantIndex].name + " has no more ranked programs and does not match."
        return [...currentState, newTurn]; 
    }
    const applicantName = newTurn.applications[applicantIndex].name;
    const programToCheckName = newTurn.applications[applicantIndex].rank[programToCheckIndex].name;
    const programToCheck = newTurn.programs[programToCheckName];

    const capacity = programToCheck.capacity; 
    const admittedCandidatesIndices = findAdmittedCandidates(programToCheck) 
    const currentAdmittedCt = admittedCandidatesIndices.length
    const currentAppIndexInProgram = findCurrentApplicantIndex(programToCheck,applicantName)

    newTurn.applications[applicantIndex].rank[programToCheckIndex].offered = true; 
    newTurn.message = `${applicantName} proposes to ${programToCheckName} but is not ranked there.`
    if (currentAppIndexInProgram !== null){
        newTurn.programs[programToCheckName].rank[currentAppIndexInProgram].offered = true;
        if (currentAdmittedCt < capacity){
            newTurn.applications[applicantIndex].tentativeMatch = programToCheckName; 
            newTurn.applications[applicantIndex].stable = true;
            newTurn.applications[applicantIndex].rank[programToCheckIndex].tentativeMatch = true;
            newTurn.programs[programToCheckName].rank[currentAppIndexInProgram].tentativeMatch = true;
            newTurn.message = `${applicantName} proposes to ${programToCheckName} and is tentatively matched.`
        } else {
            const lowestRankedAdmittedIndex = admittedCandidatesIndices.slice(-1)[0];
            const lowestRankedAdmittedName = programToCheck.rank[lowestRankedAdmittedIndex].name;
            if(lowestRankedAdmittedIndex>currentAppIndexInProgram){
                newTurn.applications[applicantIndex].tentativeMatch = programToCheckName; 
                newTurn.applications[applicantIndex].stable = true;
                newTurn.applications[applicantIndex].rank[programToCheckIndex].tentativeMatch = true;
                newTurn.programs[programToCheckName].rank[currentAppIndexInProgram].tentativeMatch = true;

                let bumpedAppIndex = findAppIndex(newTurn, lowestRankedAdmittedName) as number; 
                newTurn.applications[bumpedAppIndex].tentativeMatch = ""; 
                newTurn.applications[bumpedAppIndex].stable = false;
                let programInAppRankIndex = findProgramInAppRankIndex(newTurn, bumpedAppIndex, programToCheckName) as number; 
                newTurn.applications[bumpedAppIndex].rank[programInAppRankIndex].tentativeMatch = false;
                newTurn.programs[programToCheckName].rank[lowestRankedAdmittedIndex].tentativeMatch = false;
                newTurn.message = `${applicantName} proposes to ${programToCheckName} and is tentatively matched.
                                            ${lowestRankedAdmittedName} is bumped and needs to rematch.`    
            } else {
                newTurn.message = `${applicantName} proposes to ${programToCheckName}
                                          but does not rank higher than the current accepted candidates.`
            }
        }
    }
    return [...currentState, newTurn]
}


function findFirstUnstableApplicant (state:turn){
    let applicantIndex = 0;
    while(applicantIndex<state.applications.length){
        if(state.applications[applicantIndex].stable){
            applicantIndex +=1;
        } else {
            return applicantIndex;
        }
    }
    return -1;
}

function findFirstUnofferedProgram(state:turn, applicantIndex:number){
    let programIndex = 0; 
    let applicantsRank = state.applications[applicantIndex].rank
    while(programIndex<applicantsRank.length){
        if(applicantsRank[programIndex].offered){
            programIndex += 1;
        } else {
            return programIndex; 
        }
    }
    return -1
}

function findCurrentApplicantIndex(programToCheck:program, applicantName:string){
    let applicantIndex = null;
    for(let i=0; i<programToCheck.rank.length; i++){
        if(programToCheck.rank[i].name === applicantName){
            applicantIndex = i;
        }
    }
    return applicantIndex;  
}

function findAdmittedCandidates(programToCheck:program){
    let arrOfAdmittedCandidates = [];
    for(let i=0; i<programToCheck.rank.length; i++){
        if(programToCheck.rank[i].tentativeMatch){
            arrOfAdmittedCandidates.push(i);
        }
    }
    return arrOfAdmittedCandidates;
}

function findAppIndex(state:turn, name:string){
    let applicantIndex = null;
    for(let i=0; i<state.applications.length; i++){
        if(state.applications[i].name === name){
            applicantIndex = i;
        }
    }
    return applicantIndex;  
}

function findProgramInAppRankIndex(state:turn, appIndex:number, programName:string){
    let programIndex = null;
    for(let i=0; i<state.applications[appIndex].rank.length; i++){
        if(state.applications[appIndex].rank[i].name === programName){
            programIndex = i;
        }
    }
    return programIndex;  
}
