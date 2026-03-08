import api from "./axios"

export const getAllSkills = () => {
    return api.get('/skills')
}

export const getSkillById = (id) => {
    return api.get(`/skills/${id}`)
}

export const createSkill = (data) => {
    return api.post('/skills', data)
}

export const updateSkill = (id, data) => {
    return api.put(`/skills/${id}`, data)
}

export const deleteSkill = (id) => {
    return api.delete(`/skills/${id}`)
}

export const getMySkills = () => {
    return api.get('/me/skills')
}

export const addSkill = (skill_id, type) => {
    return api.post('/me/skills', { skill_id, type })
}

export const removeSkill = (skillId) => {
    return api.delete(`/me/skills/${skillId}`)
}