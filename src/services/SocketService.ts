import { io } from 'socket.io-client'

const socket = io('http://localhost:3001') // Adjust URL based on your server

export const joinBattle = (playerData: any) => {
    socket.emit('join-battle', playerData)
}

export const selectMove = (move: any) => {
    socket.emit('select-move', move)
}

export const onBattleStart = (callback: any) => {
    socket.on('battle-start', callback)
}

export const onMoveExecuted = (callback: any) => {
    socket.on('move-executed', callback)
}

export const onPlayerDisconnected = (callback: any) => {
    socket.on('player-disconnected', callback)
}

export default socket
