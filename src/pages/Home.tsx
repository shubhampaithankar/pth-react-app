import { useAuth } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // add proper tailwind css classes for buttons and the layout to make it fancy
    return (
        <section className='h-full flex flex-col items-center flex-wrap gap-2 justify-center'>
            <h1>Welcome to pokemon trainer hub</h1>
            { isAuthenticated? 
                <Link to='/dashboard' className='btn btn-primary '>
                    Go to dashboard
                </Link>
                :
                <Link to='/auth' className='btn btn-primary'>
                    Login
                </Link>
            }     
        </section>
    )
}
