import api from "./axios"

export const GetUserById = (id) => {
    return api.get(`/users/${id}`)
}