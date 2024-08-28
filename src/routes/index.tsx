import { Navigate, RouteObject } from 'react-router-dom'
import { Auth, Home, Battle, Pokemon, Profile, BattleGround } from '../pages'
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
                                <Profile />
                            </PrivateRoute>
                        )
                    }
                ]
            },
            {
                path: 'pokemon',
                element: (
                    <PrivateRoute>
                        <Pokemon />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: ':id', // `id` as a dynamic param
                        element: (
                            <PrivateRoute>
                                <Pokemon />
                            </PrivateRoute>
                        ),
                    },
                ]
            },
            {
                path: 'battle',
                element: (
                    <PrivateRoute>
                        <Battle />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: ':roomID', // `roomID` as a dynamic param for WebSocket
                        element: (
                            <PrivateRoute>
                                <BattleGround />
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