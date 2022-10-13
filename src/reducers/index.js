const initialState={
    boards:{
        boardsdata:[],
        lists:[],
        cards:{},
        checklists:[],
        checkItems:{}
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
            if(state.boards.cards[action.id]){
                return {
                    ...state,
                    boards:{
                        ...state.boards,
                        cards:{...state.boards.cards,[action.id]:[...state.boards.cards[action.id],action.card]}
                         }
                }}else{
                  return {
                    ...state,
                    boards:{
                        ...state.boards,
                        cards:{...state.boards.cards,[action.id]:[action.card]}
                    }
                  }
                }
           
        case "ADD_CHECKLIST":
            let items={}
            if(action.checklists.length>0){
            action.checklists.forEach((curr)=>{
                  items[curr.id]=curr.checkItems;
            })}
            return {
                ...state,
                boards:{
                    ...state.boards,
                    checklists:action.checklists,
                    checkItems:items

                }
            }
        case "CREATE_CHECKLIST":
            return {
                ...state,
                boards:{
                    ...state.boards,
                    checklists:[...state.boards.checklists,action.checklist]

                }
            }
        case "DEL_CHECKLIST":
            let del=state.boards.checklists.filter(list=>list.id!==action.id)
            return {
                ...state,
                boards:{
                    ...state.boards,
                    checklists:del

                }
            }
        case 'DEL_CHECKITEMS':{
            let arr=[...state.boards.checkItems[action.id]]
            let filterd=arr.filter((ele,idx)=>idx!==action.index)
            return {
                ...state,
                boards:{
                    ...state.boards,
                    checkItems:{...state.boards.checkItems,[action.id]:filterd}
                }
            }
        }
        case 'ADD_CHECK_ITEM':{
            if(state.boards.checkItems[action.id]){
            return {
                ...state,
                boards:{
                    ...state.boards,
                    checkItems:{...state.boards.checkItems,[action.id]:[...state.boards.checkItems[action.id],action.item]}
                }
            }}else{
              return {
                ...state,
                boards:{
                    ...state.boards,
                    checkItems:{...state.boards.checkItems,[action.id]:[action.item]}
                }
              }
            }
        }
        default:
            return state
    }
}