import api from "./axios"

export const GetUserById = (id) => {
    return api.get(`/users/${id}`)
}

export const UpdateProfil = (data)=>{
    return api.put("/update-me", data)
}

export const uploadPhoto = (file) => {
    const formData = new FormData()
    formData.append('photo', file)
    return api.post('/me/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}