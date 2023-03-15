type actions = 'new' | 'playerTurn' | 'other'; 
type state = {lastTurn: string} 

export function reducer(state:state, action:actions):state{

    if(action === 'new'){
        return {lastTurn: 'new'}
    }
    if(action === 'playerTurn') return {lastTurn: "playerTurn"}
    if(action === 'other') return {lastTurn: 'other'}
    throw new Error("unknown action"); 
}


