import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost/lele-api',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Centralized error logging; UI layers should handle user notifications
        // Avoid referencing UI-specific libs here to keep this module decoupled
        console.error('[API Error]', error?.response?.status, error?.response?.data)
        throw error
    }
)
