import api from "./axios"

export const getSendFriendRequest = (data) => {
    return api.post('/friend-requests', data);
}

export const getReceiveFriendRequest = () => {
    return api.get('/friend-requests')
}

export const SeeSentFriendRequest = () => {
    return api.get('/friend-requests/sent') 
}

export const SpecifiqueFriendRequest = (id) => {
    return api.get(`/friend-requests/${id}`) 
}

export const RefusedFriendRequest = (id, data) => {
    return api.put(`/friend-requests/${id}`, data) 
}

export const DeleteFriendRequest = (id) => {
    return api.delete(`/friend-requests/${id}`) 
}

export const FriendSuggestions = () =>{
    return api.get('/suggestions')
}

//voir tous mes match (amis)
export const GetAllFriend = () =>{
    return api.get('/matches')
}

//Voir un match spécifique 

export const SpecifiqueFriend = (id) =>{
    return api.get(`/matches/${id}`)
}

export const DeleteFriend = (id) =>{
    return api.delete(`/matches/${id}`)
}

