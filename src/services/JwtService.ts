import { jwtDecode } from 'jwt-decode'

export const isTokenExpired = (token: string | null) => {
    if (!token) return true
    try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return decodedToken.exp ? decodedToken.exp < currentTime : true
    } catch (error) {
        console.error('Error decoding token:', error)
        return true
    }
}