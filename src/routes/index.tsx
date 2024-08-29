import { Navigate, RouteObject } from 'react-router-dom'
import { Auth, Home, Battle, Pokemon, Profile, BattleGround, PokemonDetail } from '../pages'
import PrivateRoute from './PrivateRoute'
import { Outlet } from 'react-router-dom'

export const AppRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='home' />, // Redirect root path to home
    },
    {
        path: 'home',
        element: <Home />,
    },
    {
        path: 'auth',
        element: <Auth />,
    },
    {
        path: 'profile',
        element: (
            <PrivateRoute>
                <Outlet />
            </PrivateRoute>
        ),
        children: [
            {
                path: ':username',
                element: <Profile />, // Profile page for a specific username
            }
        ],
    },
    {
        path: 'pokemon',
        element: (
            <PrivateRoute>
                <Outlet />
            </PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: <Pokemon />, // Main Pokémon page
            },
            {
                path: ':id',
                element: <PokemonDetail />, // Pokémon detail page
            },
        ],
    },
    {
        path: 'battle',
        element: (
            <PrivateRoute>
                <Outlet />
            </PrivateRoute>
        ),
        children: [
            {
                path: '',
                element: <Battle />, // Main Battle page
            },
            {
                path: ':roomID',
                element: <BattleGround />, // Battle room page
            },
        ],
    },
    {
        path: '*',
        element: <>404 - Page not found</>, // Wildcard route for 404 errors
    }
]
