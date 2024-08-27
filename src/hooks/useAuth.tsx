import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext<unknown>({})

export const AuthProvider = ({ children }: { children: React.JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const login = () => {

    }

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    useEffect(() => {
        setIsAuthenticated(!!(token && user))
    }, [])

    useEffect(() => {
        if (!user) {
            console.log('fetch user data using token')
            // setUser()
        }
    }, [token])

    useEffect(() => {
        if (user && !token) logout()
    }, [user])

    const authContext = {
        isAuthenticated, user, token, login, logout
    }
    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export default function useAuth () {
    return useContext(AuthContext)
}