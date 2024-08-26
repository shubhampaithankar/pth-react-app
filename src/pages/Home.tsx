import React, { useEffect, useState } from 'react'
import { Loader, Card } from '../components'

import { Pokemon } from '../utils/Types'

import { getRandomPokemon } from '../utils/Apis'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [pokemon, setPokemon] = useState<Pokemon[]>([])

    const fetchPokemon = () => {
        setLoading(true)
        getRandomPokemon()
            .then((data) => setPokemon(data.result))
            .then(() => setLoading(false))
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
}
