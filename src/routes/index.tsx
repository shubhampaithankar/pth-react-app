import { Navigate, RouteObject } from 'react-router-dom'
import { Auth, Home } from '../pages'
import PrivateRoute from './PrivateRoute'

export const AppRoutes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <Navigate to='home' />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'auth',
                element: <Auth />
            },
            {
                path: 'profile',
                children: [
                    {
                        path: ':username', // username as a dynamic param
                        element: (
                            <PrivateRoute>
                                <>profile page</>
                                {/* <ProfilePage /> */}
                            </PrivateRoute>
                        )
                    }
                ]
            },
            {
                path: 'pokemon',
                children: [
                    {
                        path: ':id', // `id` as a dynamic param
                        element: (
                            <PrivateRoute>
                                <>pokemon detail page</>
                                {/* <PokemonPage /> */}
                            </PrivateRoute>
                        ),
                        children: [
                            {
                                path: 'catch', // `catch` as a separate dynamic param
                                element: (
                                    <PrivateRoute>
                                        <>catch pokemon page</>
                                        {/* <PokemonPage /> */}
                                    </PrivateRoute>
                                )
                            }
                        ]
                    }
                ]
            },
            {
                path: 'battle',
                children: [
                    {
                        path: ':roomID', // `roomID` as a dynamic param for WebSocket
                        element: (
                            <PrivateRoute>
                                <>battle room page</>
                                {/* <BattlePage /> */}
                            </PrivateRoute>
                        )
                    }
                ]
            },
            {
                path: '*',
                element: <>404 - Page not found</>
            }
        ]
    }
]