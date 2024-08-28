import axios from 'axios'
import { LoginResponse, RegisterResponse } from './Types'

export const baseURL = 'http://localhost:3001/api/'

const apiInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
})

export const loginUser = async (data: any) => apiInstance.post<LoginResponse>('auth/login', data).then(response => response.data)
export const registerUser = async (data: any) => apiInstance.post<RegisterResponse>('auth/register', data).then(response => response.data)

export const getRandomPokemon = async () => apiInstance.post('pokemon/get-random').then(response => response.data)
