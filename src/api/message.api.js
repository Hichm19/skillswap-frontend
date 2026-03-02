import axios from './axios.js' // adapte le chemin selon ton projet

/**
 * Récupérer tous les messages d'un match
 * GET /api/matches/{matchId}/messages
 */
export const GetMessages = (matchId) => {
  return axios.get(`/matches/${matchId}/messages`)
}

/**
 * Envoyer un message dans un match
 * POST /api/matches/{matchId}/messages
 */
export const SendMessage = (matchId, content) => {
  return axios.post(`/matches/${matchId}/messages`, { content })
}

/**
 * Supprimer un message
 * DELETE /api/messages/{messageId}
 */
export const DeleteMessage = (messageId) => {
  return axios.delete(`/messages/${messageId}`)
}