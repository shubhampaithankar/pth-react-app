import { useEffect, useState } from 'react'

import { Pokemon as PokemonObj } from '../utils/Types'
import { getRandomPokemon } from '../services/ApiService'
import { Loader, Card } from '../components'
import { useQuery } from '@tanstack/react-query'

// todo implement useQuery, 

export default function Pokemon() {
    const [pokemon, setPokemon] = useState<PokemonObj[]>([])

    const { data, isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['fetchRandomPokemon'],
        queryFn: getRandomPokemon,
    })

    // todo: populate pokemon array with data fetched with useQuery
    useEffect(() => {
        if (data) {
            const { ack, error, pokemon } = data
            if (ack === 1) setPokemon(pokemon!)
            else console.log(error)
        }
    }, [data])
    
    return (
        <section className='h-full flex items-center flex-wrap gap-2 justify-center'>
            { isLoading && <Loader /> }
            { (!isLoading && isSuccess) && pokemon.map((entry, i) => <Card key={i} pokemon={entry}/>) }
        </section>
    )
}
