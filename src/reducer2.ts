class MatchState {
    constructor(initialState){
        this.stateStages = [initialState];
    }

    reset () {
        let initialState = this.stateStages[0];
        this.stateStages = [initialState];
    }

    solve () {      
        let lastTurn = this.stateStages.slice(-1)[0]
        let isItSolved = lastTurn.solved;
        while(!isItSolved){
            this.oneTurn();
            lastTurn = this.stateStages.slice(-1)[0]
            isItSolved = lastTurn.solved;
        }
    }
    oneTurn () {
        let newState = JSON.parse(JSON.stringify(this.stateStages[this.stateStages.length-1]));

        const applicantIndex = findFirstUnstableApplicant(newState);
        if(applicantIndex == -1){
            newState.solved = true;
            newState.systemMessage = "The match is complete."
            this.stateStages.push(newState);
            return ;
        }
        const programToCheckIndex = findFirstUnofferedProgram(newState, applicantIndex);
        if(programToCheckIndex == -1){
            newState.applicants[applicantIndex].tentativeMatch = "No Match";
            newState.applicants[applicantIndex].stable = true;
            newState.systemMessage = newState.applicants[applicantIndex].name + " has no more ranked programs and does not match."
            this.stateStages.push(newState);
            return
        }
        const applicantName = newState.applicants[applicantIndex].name;
        const programToCheckName = newState.applicants[applicantIndex].rank[programToCheckIndex].name;
        const programToCheck = newState.programs[programToCheckName];

        const capacity = parseInt(programToCheck.capacity);
        const admittedCandidatesIndices = findAdmittedCandidates(programToCheck) 
        const currentAdmittedCt = admittedCandidatesIndices.length
        const currentAppIndexInProgram = findCurrentApplicantIndex(programToCheck,applicantName)

        newState.applicants[applicantIndex].rank[programToCheckIndex].offered = true; 
        newState.systemMessage = `${applicantName} proposes to ${programToCheckName} but is not ranked there.`
        if (currentAppIndexInProgram !== null){
            newState.programs[programToCheckName].rank[currentAppIndexInProgram].offered = true;
            if (currentAdmittedCt < capacity){
                newState.applicants[applicantIndex].tentativeMatch = programToCheckName; 
                newState.applicants[applicantIndex].stable = true;
                newState.applicants[applicantIndex].rank[programToCheckIndex].tentMatch = true;
                newState.programs[programToCheckName].rank[currentAppIndexInProgram].tentMatch = true;
                newState.systemMessage = `${applicantName} proposes to ${programToCheckName} and is tentatively matched.`
            } else {
                const lowestRankedAdmittedIndex = admittedCandidatesIndices.slice(-1)[0];
                const lowestRankedAdmittedName = programToCheck.rank[lowestRankedAdmittedIndex].name;
                if(lowestRankedAdmittedIndex>currentAppIndexInProgram){
                    newState.applicants[applicantIndex].tentativeMatch = programToCheckName; 
                    newState.applicants[applicantIndex].stable = true;
                    newState.applicants[applicantIndex].rank[programToCheckIndex].tentMatch = true;
                    newState.programs[programToCheckName].rank[currentAppIndexInProgram].tentMatch = true;

                    let bumpedAppIndex = findAppIndex(newState, lowestRankedAdmittedName)
                    newState.applicants[bumpedAppIndex].tentativeMatch = ""; 
                    newState.applicants[bumpedAppIndex].stable = false;
                    let programInAppRankIndex = findProgramInAppRankIndex(newState, bumpedAppIndex, programToCheckName)
                    newState.applicants[bumpedAppIndex].rank[programInAppRankIndex].tentMatch = false;
                    newState.programs[programToCheckName].rank[lowestRankedAdmittedIndex].tentMatch = false;
                    newState.systemMessage = `${applicantName} proposes to ${programToCheckName} and is tentatively matched.
                                              ${lowestRankedAdmittedName} is bumped and needs to rematch.`
                } else {
                    newState.systemMessage = `${applicantName} proposes to ${programToCheckName}
                                              but does not rank higher than the current accepted candidates.`
                }
            }
        }
        this.stateStages.push(newState);
    }
}


function findFirstUnstableApplicant (state){
    let applicantIndex = 0;
    while(applicantIndex<state.applicants.length){
        if(state.applicants[applicantIndex].stable){
            applicantIndex +=1;
        } else {
            return applicantIndex;
        }
    }
    return -1;
}

function findFirstUnofferedProgram(state, applicantIndex){
    let programIndex = 0; 
    let applicantsRank = state.applicants[applicantIndex].rank
    while(programIndex<applicantsRank.length){
        if(applicantsRank[programIndex].offered){
            programIndex += 1;
        } else {
            return programIndex; 
        }
    }
    return -1
}

function findCurrentApplicantIndex(programToCheck, applicantName){
    let applicantIndex = null;
    for(let i=0; i<programToCheck.rank.length; i++){
        if(programToCheck.rank[i].name == applicantName){
            applicantIndex = i;
        }
    }
    return applicantIndex;  
}

function findAdmittedCandidates(programToCheck){
    let arrOfAdmittedCandidates = [];
    for(let i=0; i<programToCheck.rank.length; i++){
        if(programToCheck.rank[i].tentMatch){
            arrOfAdmittedCandidates.push(i);
        }
    }
    return arrOfAdmittedCandidates;
}

function findAppIndex(state, name){
    let applicantIndex = null;
    for(let i=0; i<state.applicants.length; i++){
        if(state.applicants[i].name == name){
            applicantIndex = i;
        }
    }
    return applicantIndex;  
}

function findProgramInAppRankIndex(state, appIndex, programName){
    let programIndex = null;
    for(let i=0; i<state.applicants[appIndex].rank.length; i++){
        if(state.applicants[appIndex].rank[i].name == programName){
            programIndex = i;
        }
    }
    return programIndex;  
}



module.exports = { 
    MatchState, findFirstUnstableApplicant, findFirstUnofferedProgram, 
    findAdmittedCandidates, findCurrentApplicantIndex, findAppIndex, 
    findProgramInAppRankIndex
}




const programNames = ['Mercy', 'City', 'General']; 
const applicantNames = ['Arthur', 'Sunny', 'Joseph', 'Latha', 'Darrius']

const getRandomOrder = function (optionsArr) {
    let randomChoices = []
    const optionsArrLength = optionsArr.length;
    for(let i=0; i<optionsArrLength; i++){
        randomChoices.push(Math.floor(Math.random() * optionsArrLength))
    }
    let choicesUnique = Array.from(new Set(randomChoices))
    let returnArr = [];
    for(let i=0; i<choicesUnique.length; i++){
        returnArr.push({name:optionsArr[choicesUnique[i]], offered: false, tentMatch: false})
    }
    return returnArr;
}

const getRandomCapacity = function(){
    let returnInt = Math.random()<.6 ? 2 : 1;
    return returnInt
}

const getRandomState = function () {
    let newState = {
        solved: false, 
        systemMessage: "Applicant and Program rankings are set.  Play the first turn in the matching algorithm or solve to see the end result.",
        applicants: [
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
module.exports = getRandomState;