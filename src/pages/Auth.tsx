import { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { loginUser, registerUser } from '../utils/Apis'
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (formData: FieldValues) => {
        try {
            const { username, password } = formData
            const { ack, error, token, user } = await loginUser({ username, password })
            if (ack === 0) {
                console.log(error)
                return
            }

            if (ack === 1) {
                login(user!, token!)

            }
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
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
            </div>
            <div className="form-group">
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
                    Login
                </button>
            </div>
        </form>
    )
}

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm()

    const onSubmit = async (formData: FieldValues) => {
        try {
            const { username, password } = formData
            const data = await registerUser({ username, password })
            console.log('Registration success:', data)
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
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
                    Register
                </button>
            </div>
        </form>
    )
}
