
export const getAllboards=(boards)=>{
    return {
        type:"ADD_BOARDS",
        boards,
    }
}
export const getLists=(lists)=>{
    return {
        type:"ADD_LISTS",
        lists

    }
}