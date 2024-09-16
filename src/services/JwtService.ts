import { jwtDecode } from 'jwt-decode'
import { tryCatch } from '../utils/HelperFunctions'

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true // No token means it's expired

    const [error, decoded] = tryCatch(() => {
        const decodedToken = jwtDecode<{ exp: number | undefined }>(token) // Specify the decoded token shape
        const currentTime = Date.now() / 1000
        return decodedToken.exp ? decodedToken.exp < currentTime : true
    })

    if (error) {
        console.error('Error decoding token:', error) // Log error for debugging
        return true // If there is an error, consider the token expired
    }

    return !!decoded // If the decoded result is true, the token is still valid
}