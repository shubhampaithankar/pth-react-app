import React from 'react'
import { useAuth } from '../hooks'

export default function PrivateRoute({ children }: { children: React.JSX.Element }) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <>401 unauthorized</>
}
