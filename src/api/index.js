const APIKey='438e718f7d082e3a64847eb1005ad911'
const APIToken='07561081d6367d24c9925ab2bc2f417274f566ed773ea3a6a59c618fa042891a'
// const boardId="633c50a67f614a0101f226ed"
export const getBoards=()=>{
  return fetch(`https://api.trello.com/1/members/me/boards?&key=${APIKey}&token=${APIToken}&filter=open`)
  .then((res)=>res.json()).then(data=>data)
  .catch((err)=>console.log(err))
}
export const createBoard=(board)=>{
  return fetch(`https://api.trello.com/1/boards/?name=${board}&key=${APIKey}&token=${APIToken}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      )
      return response
    })
    .catch(err => console.error(err));
}
export const getLists=(boardId)=>{
  return fetch(`https://api.trello.com/1/boards/${boardId}/lists?key=${APIKey}&token=${APIToken}&filter=open`, {
   method: 'GET',
   headers: {
     'Accept': 'application/json'
   }
 })
   .then(response => {
     return response.json();
   })
   .then(text => text)
   .catch(err => console.error(err));
 }

 export const getCards=(id)=>{
  return fetch(`https://api.trello.com/1/lists/${id}/cards?key=${APIKey}&token=${APIToken}`, {
    method: 'GET'
  }).then(res=>res.json())
  .then(data=>data)
.catch(error=>console.log(error))
}
export const createCard=(listid,name)=>{
  return fetch(`https://api.trello.com/1/cards?idList=${listid}&key=${APIKey}&token=${APIToken}&name=${name}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json()
    }).then(text=>text)
    .catch(err => console.error(err));
}
export const deleteCard=(id)=>{
  return fetch(`https://api.trello.com/1/cards/${id}?key=${APIKey}&token=${APIToken}`, {
    method: 'DELETE'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text =>(text))
    .catch(err => console.error(err));
  }
export const getChecklist=(id)=>{

  return fetch(`https://api.trello.com/1/cards/${id}/checklists?key=${APIKey}&token=${APIToken}`, {
    method: 'GET'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.json();
    })
    .then(text => text)
    .catch(err => console.error(err));
}

export const makeList=(name,boardId)=>{
  return fetch(`https://api.trello.com/1/lists?name=${name}&idBoard=${boardId}&key=${APIKey}&token=${APIToken}`, {
 method: 'POST'
})
 .then(response => {
   console.log(
     `Response: ${response.status}`
   );
 })
 .catch(err => console.error(err));
}
export const deleteList=(id)=>{
  return fetch(`https://api.trello.com/1/lists/${id}/closed?value=true&key=${APIKey}&token=${APIToken}`, {
    method: 'PUT'
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => (text))
    .catch(err => console.error(err));
}