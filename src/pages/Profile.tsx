import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../hooks'
import { deletePokemonfromUser } from '../services/ApiService'
import { Card } from '../components'

export default function Profile() {
    // This is a profile page for user with dyanmic id with user based data
    const { user } = useAuth()
    // function to remove pokemon from user
    const { mutate, isError, isPending } = useMutation({
        mutationKey: ['deleteUserPokemon'],
        mutationFn: deletePokemonfromUser
    })

    const props = {
        mutate, 
        buttonType: 'delete'
    }

    return (
        <section className='h-full flex flex-col items-center flex-wrap justify-center'>
            <h1>My Profile</h1>
            <p>Hello, {user?.username}</p>
            <h2>My Pokemon</h2>
            <ul className='flex items-center flex-wrap gap-2 justify-center'>
                { user?.pokemon.map(pokemon => 
                    <li key={pokemon.id} className='cursor-pointer' style={{ width: '350px', height: '600px' }}>
                        <Card pokemon={pokemon} {...props}/>
                    </li>) 
                }
            </ul>
        </section>
    )
}
