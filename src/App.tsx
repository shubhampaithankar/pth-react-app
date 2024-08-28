import { AuthProvider } from './hooks/useAuth'
import { Navbar } from './components/common/'
import Routes from './routes/Routes'

export default function App() {
    return (
        <AuthProvider>
            <Navbar />
            <main className='md:container md:mx-auto h-screen'>
                <Routes />
            </main>
        </AuthProvider>
    )
}
