import { lazy } from 'react'

export const Home = lazy(() => import('./Home.tsx'))
export const Auth = lazy(() => import('./Auth.tsx'))
export const Battle = lazy(() => import('./Battle.tsx'))
export const BattleGround = lazy(() => import('./BattleGround.tsx'))
export const Profile = lazy(() => import('./Profile.tsx'))
export const Pokemon = lazy(() => import('./Pokemon.tsx'))
export const PokemonDetail = lazy(() => import('./PokemonDetail.tsx'))