import axios from 'axios'
import { GetPokemonInfoRequest, GetPokemonInfoResponse, GetRandomPokemonResponse, LoginRequest, LoginResponse, RefreshTokenResponse, RegisterRequest, RegisterResponse } from '../utils/Types'

export const baseURL = 'http://localhost:3001/api/'

export const apiInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('token')}`
    },
})

export const loginUser = async (data: LoginRequest) => apiInstance.post<LoginResponse>('auth/login', data).then(response => response.data)
export const registerUser = async (data: RegisterRequest) => apiInstance.post<RegisterResponse>('auth/register', data).then(response => response.data)
export const refreshToken = async () => apiInstance.post<RefreshTokenResponse>('auth/refresh').then(response => response.data)

export const getRandomPokemon = async () => apiInstance.post<GetRandomPokemonResponse>('pokemon/get-random').then(response => response.data)
export const getPokemonInfo = async (data: GetPokemonInfoRequest) => apiInstance.post<GetPokemonInfoResponse>('pokemon/get-details', data).then(response => response.data)