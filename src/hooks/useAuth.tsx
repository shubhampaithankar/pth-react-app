import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// import { InternalAxiosRequestConfig } from 'axios'

import { AuthContextType, User } from '../utils/Types'
import { isTokenExpired } from '../services/JwtService'
import { refreshToken } from '../services/ApiService'
import { tryCatch } from '../utils/HelperFunctions'

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const login = (user: User, token: string) => {
        const [error] = tryCatch(() => {
            setUser(user)
            setToken(token)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        })

        if (error) console.log(error)
    }

    const logout = useCallback(() => {
        const [error] = tryCatch(() => {
            setUser(null)
            setToken(null)
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            navigate('/')
        })
        if (error) console.log(error)
    }, [navigate])

    const refreshAccessToken = useCallback(async () => {
        const [error] = tryCatch(async () => {
            const { ack, error, token } = await refreshToken()
            if (ack === 1) {
                setToken(token!)
                localStorage.setItem('token', token!)
            } else throw error
        })

        if (error) {
            console.error('Token refresh error:', error)
            logout() 
        }
        
    }, [logout])

    useEffect(() => {
        setUser(() => {
            const storedUser = localStorage.getItem('user')
            return storedUser ? JSON.parse(storedUser) : null
        })
        setToken(() => localStorage.getItem('token'))
    }, [])

    // useEffect(() => {
    //     console.log('useeffect for token change')
    //     if (token) {
    //         apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    //             config.headers['Authorization'] = `Bearer ${token}`
    //             return config
    //         })
    //     } else {
    //         apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    //             delete config.headers['Authorization']
    //             return config
    //         })
    //     }
    // }, [token])

    useEffect(() => {
        setIsAuthenticated(Boolean(token) && Boolean(user))
    }, [token, user])

    useEffect(() => {
        if (isAuthenticated) {
            // check if the access token has expired in an interval of 10 minutes and refresh it if so.
            const interval = setInterval(() => {
                if (token) {
                    const isExpired = isTokenExpired(token!)
                    if (isExpired) refreshAccessToken()
                } else clearInterval(interval)
            }, 600 * 1e3)

            return () => clearInterval(interval)
        }
    }, [isAuthenticated])

    const authContext: AuthContextType = {
        isAuthenticated,
        user,
        token,
        login,
        logout,
    }

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}