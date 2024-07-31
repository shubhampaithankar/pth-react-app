import axios from 'axios'

export const baseURL = ''

const apiInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
})