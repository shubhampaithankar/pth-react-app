import { useAuth } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    return (
        <section className='h-full flex items-center flex-wrap gap-2 justify-center'>
            <h1>Welcome to pokemon trainer hub</h1>
        </section>
    )
}
