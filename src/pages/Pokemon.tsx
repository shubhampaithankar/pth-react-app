import { memo, useEffect, useState } from 'react'

import { Pokemon as PokemonObj } from '../utils/Types'
import { getRandomPokemon } from '../services/ApiService'
import { Loader, Card } from '../components'

export default memo(function Pokemon() {
    const [loading, setLoading] = useState(false)
    const [pokemon, setPokemon] = useState<PokemonObj[]>([])

    const fetchPokemon = async () => {
        try {
            setLoading(true)
            const { result, error, ack } = await getRandomPokemon()
            if (ack === 1) setPokemon(result)
            else throw error
        } catch (error) {
            
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchPokemon()
    }, [])
    
    return (
        <section className='h-full flex items-center flex-wrap gap-2 justify-center'>
            { loading && <Loader /> }
            { !loading && pokemon.map((entry, i) => <Card key={i} pokemon={entry}/>) }
        </section>
    )
})
