import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../hooks'
import { deletePokemonfromUser } from '../services/ApiService'
import { Card } from '../components'
import { useState } from 'react'
import { Pokemon, User } from '../utils/Types'
import { Switch } from '../utils/HelperFunctions'

export default function Profile() {
    const { user } = useAuth()
    const [currentMatch, setCurrentMatch] = useState('account')

    const changeMatch = (match: string) => setCurrentMatch(match)

    return (
        <section className='h-full flex flex-col items-center flex-wrap justify-center'>
            <h1>Profile</h1>
            <p>Hello, {user?.username}</p>
            {/* add a horizontol navigation bar here to go to other section of the page such as profile, pokemons, etc. */}
            <ul className='flex items-center justify-around gap-2 w-full'>
                <li onClick={() => changeMatch('account')} className={currentMatch === 'account' ? 'text-blue-500' : ''}>Account</li>
                <li onClick={() => changeMatch('pokemons')} className={currentMatch === 'pokemons' ? 'text-blue-500' : ''}>Pokemons</li>
            </ul>
            <Switch match={currentMatch}>
                <AccountSection match='account' user={user!} />
                <PokemonSection match='pokemons' pokemons={user!.pokemon} />    
            </Switch>           

        </section>
    )
}

const AccountSection = ({ user, match }: { user: User, match: string }) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <h2>My Account</h2>
            <p>Hello, {user.username}</p>
        </div>
    )
}

const PokemonSection = ({ pokemons, match }: { pokemons: Pokemon[], match: string }) => {
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['deleteUserPokemon'],
        mutationFn: deletePokemonfromUser
    })

    const props = { mutate, buttonType: 'delete' }

    return (
        <>
            <h2>My Pokemon</h2>
            <ul className='flex items-center flex-wrap gap-2 justify-center'>
                { pokemons.map(pokemon => 
                    <li key={pokemon.id} className='cursor-pointer' style={{ width: '350px', height: '600px' }}>
                        <Card pokemon={pokemon} {...props}/>
                    </li>) 
                }
            </ul>
        </>
    )
}