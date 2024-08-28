import { AuthProvider } from './hooks/useAuth'
import { Navbar } from './components/common/'
import Routes from './routes/Routes'
import { Suspense } from 'react'

export default function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Suspense fallback={<>Loading page</>}>
                <main className='md:container md:mx-auto h-screen'>
                    <Routes />
                </main>
            </Suspense>
        </AuthProvider>
    )
}
