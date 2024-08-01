import axios from 'axios'

export const baseURL = 'http://localhost:3001/api/'

const apiInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
})

export const getRandomPokemon = async () => apiInstance.post('pokemon/get-random').then(response => response.data)