import React, { useState } from 'react'
import { loginUser, registerUser } from '../utils/Apis'

export default function Auth() {
    const [isRegister, setIsRegister] = useState(false)
    return (isRegister ? <Register /> : <Login />)
}

const Login = () => {
    const handleSubmit = async (formData: any) => {
        const { username, password } = formData
        const data = await loginUser({
            username, password
        })
    }

    return <></>
}


const Register = () => {
    const handleSubmit = async (formData: any) => {
        const { username, password } = formData
        const data = await registerUser({
            username, password
        })
    }
    
    return <></>
}