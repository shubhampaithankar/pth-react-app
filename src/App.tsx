import Routes from './routes/Routes'
import { AuthProvider } from './hooks/useAuth'

export default function App() {
    return (
        <AuthProvider>
            <main className='md:container md:mx-auto h-screen'>
                <Routes />
            </main>
        </AuthProvider>
    )
}
