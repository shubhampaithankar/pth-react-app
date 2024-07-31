import { Navigate, RouteObject } from 'react-router-dom'
import { Home } from '../pages'

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
                path: '**',
                element: <>404 - Page not found</>
            }
        ]
    }
]