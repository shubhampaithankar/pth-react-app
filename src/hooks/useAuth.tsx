import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternalAxiosRequestConfig } from 'axios'

import { AuthContextType, User } from '../utils/Types'
import { isTokenExpired } from '../services/JwtService'
import { apiInstance, refreshToken } from '../services/ApiService'

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
        try {
            setUser(user)
            setToken(token)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = useCallback(() => {
        try {
            setUser(null)
            setToken(null)
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }, [navigate])

    const refreshAccessToken = useCallback(async () => {
        try {
            const { ack, error, token } = await refreshToken()
            if (ack === 1) {
                setToken(token!)
                localStorage.setItem('token', token!)
            } else throw error

        } catch (error) {
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

    useEffect(() => {
        if (token) {
            apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
                config.headers['Authorization'] = `Bearer ${token}`
                return config
            })

            const interval = setInterval(() => {
                if (isTokenExpired(token)) refreshAccessToken()
            }, 60 * 1000)

            return () => clearInterval(interval)
        }
    }, [token])

    useEffect(() => {
        setIsAuthenticated(Boolean(token) && Boolean(user))
    }, [token, user])

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