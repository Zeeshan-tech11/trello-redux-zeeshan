const initialState={
    boards:{
        boardsdata:[],
        lists:[],
        cards:{},
        checklists:[]
    }
}

export const boardReducer=(state=initialState,action)=>{
    switch (action.type) {
        case 'ADD_BOARDS':
            return {
                ...state,
                boards:{
                    ...state.boards,
                  boardsdata:action.boards
                }
            }
        case "ADD_LISTS":
            return {
                ...state,
                boards:{
                    ...state.boards,
                    lists:action.lists,
                }
            }
        case "ADD_CARDS":
            return {
                ...state,
                boards:{
                    ...state.boards,
                    cards:{...state.boards.cards,[action.id]:action.card}
                }
            }
        case "ADD_CARD":
            return {
                ...state,
                boards:{
                    ...state.boards,
                    cards:{...state.boards.cards,[action.id]:[...state.boards.cards[action.id],action.card]}
                }
            }
        case "ADD_CHECKLIST":
            return {
                ...state,
                boards:{
                    ...state.boards,
                    checklists:action.checklists

                }
            }
        default:
            return state
    }
}