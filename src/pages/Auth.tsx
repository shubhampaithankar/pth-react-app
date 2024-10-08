import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

import { loginUser, registerUser } from '../services/ApiService'
import { useAuth } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [isRegister, setIsRegister] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/pokemon')
            return
        }
    }, [isAuthenticated, navigate])

    return (
        <section className="h-full flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                {isRegister ? <Register /> : <Login />}
                <div className="mt-4 text-center">
                    <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? 'Already registered? Login here' : 'Create new trainer'}
                    </span>
                </div>
            </div>
        </section>
    )
}

const Login = () => {
    const { login } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: ({ ack, error, token, user }) => {
            if (ack === 1) login(user!, token!)
            else console.log(error)
        }
    })

    const onSubmit = async (formData: FieldValues) => {
        try {
            const { username, password } = formData
            mutate({ username, password })
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-group">
                <label htmlFor="username" className="block text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    disabled={isPending}
                    {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message?.toString()}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password" className="block text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    disabled={isPending}
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
            </div>
            <div className="form-group">
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md" disabled={isPending}>
                    Login
                </button>
            </div>
        </form>
    )
}

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const { mutate, isPending } = useMutation({
        mutationKey: ['register'],
        mutationFn: registerUser,
        onSuccess: ({ ack, error }) => {
            if (ack !== 1) console.log(error)
        }
    })

    const onSubmit = async (formData: FieldValues) => {
        try {
            const { username, password } = formData
            mutate({ username, password })
        } catch (error) {
            console.error('Registration error:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-group">
                <label htmlFor="username" className="block text-gray-700">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    disabled={isPending}
                    {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message?.toString()}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password" className="block text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    disabled={isPending}
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters long',
                        },
                    })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword" className="block text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    disabled={isPending}
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) =>
                            value === watch('password') || 'Passwords do not match',
                    })}
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message?.toString()}</p>
                )}
            </div>
            <div className="form-group">
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md" disabled={isPending}>
                    Register
                </button>
            </div>
        </form>
    )
}
