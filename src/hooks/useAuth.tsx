import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthContextType, User } from '../utils/Types'
import { isTokenExpired } from '../services/JwtService'
import { useNavigate } from 'react-router-dom'

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

    const logout = () => {
        try {
            setUser(null)
            setToken(null)
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUser(() => {
            const storedUser = localStorage.getItem('user')
            return storedUser ? JSON.parse(storedUser) : null
        })
        setToken(() => localStorage.getItem('token'))
    }, [])

    useEffect(() => {
        if(token && isTokenExpired(token)) {
            logout()
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        setIsAuthenticated(!!token && !!user)
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