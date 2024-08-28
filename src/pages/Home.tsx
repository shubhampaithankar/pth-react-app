import { useEffect } from 'react'
import { useAuth } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/pokemon')
            return
        }
    }, [isAuthenticated, navigate])

    return (
        <section className='h-full flex items-center flex-wrap gap-2 justify-center'>
            <h1>Welcome to pokemon trainer hub</h1>
        </section>
    )
}
