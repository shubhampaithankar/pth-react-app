import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { AuthContextType, User } from '../utils/Types'

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

    const login = (user: User, token: string) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    useEffect(() => {
        setIsAuthenticated(!!token && !!user)
    }, [token, user])

    useEffect(() => {
        if (token && !user) {
            console.log('fetch user data using token')
            // setUser(fetchedUser);
        }
    }, [token])

    useEffect(() => {
        if (user && !token) logout()
    }, [user, token])

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
