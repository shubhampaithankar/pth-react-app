import { jwtDecode } from 'jwt-decode'

export const isTokenExpired = (token: string) => {
    if (!token) return true
    try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        console.log(decodedToken.exp ? decodedToken.exp < currentTime : true)
        return decodedToken.exp ? decodedToken.exp < currentTime : true
    } catch (error) {
        console.error('Error decoding token:', error)
        return true
    }
}