import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import useAuth from './useAuth'
import { SocketContextType } from '../utils/Types'

export const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: []
})

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, user } = useAuth()

    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

    useEffect(() => {
        if (!isAuthenticated && socket) {
            socket.close()
            setSocket(null)
            
        } else if (isAuthenticated) {
            setSocket(() => {
                const socket = io('http://localhost:3001', { transports: ['websocket'], query: {
                    userId: user!.id
                } })
                return socket
            })
        }

        return () => {
            if (socket) {
                socket.close()
            }
        }

    }, [isAuthenticated])

    useEffect(() => {
        if (socket) {
            socket.on('getOnlineUsers', (users) => setOnlineUsers(users))
        }
    }, [socket])

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}

export default function useSocket() {
    const socket = useContext(SocketContext)
    if (!socket) throw new Error('useSocket must be used within a SocketProvider')
    return socket
}