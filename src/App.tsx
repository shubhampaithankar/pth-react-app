import { Suspense } from 'react'

import { AuthProvider } from './hooks/useAuth'
import { SocketProvider } from './hooks/useSocket'
import { Navbar } from './components/common/'
import Routes from './routes/Routes'

// to add: react query, react table, react modal, react toastify

export default function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <Navbar />
                <Suspense fallback={<>Loading page</>}>
                    <main className='md:container md:mx-auto h-screen'>
                        <Routes />
                    </main>
                </Suspense>
            </SocketProvider>
        </AuthProvider>
    )
}
