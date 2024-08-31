import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PokemonDetail as Info } from '../utils/Types'
import { getPokemonInfo } from '../services/ApiService'
import { Loader, Type } from '../components'

export default function PokemonDetail() {
    const { id } = useParams<{ id: string }>()

    const [pokemon, setPokemon] = useState<Info | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const data = await getPokemonInfo({
                    id
                })
                setPokemon(data.result)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch Pokémon details')
                setLoading(false)
            }
        }

        fetchPokemonDetails()
    }, [id])

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>
    }

    if (!pokemon) {
        return <div className="text-center mt-10">No Pokémon data available</div>
    }

    return (
        <section className="p-8 bg-gray-100 min-h-screen">
            {
                loading ? (
                    <Loader />
                ) : (
                    pokemon && 
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
                    <p className="text-gray-500">ID: {pokemon.id}</p>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between mt-6">
                    <div className="md:w-1/2">
                        <img
                            src={pokemon.sprites.front_default!}
                            alt={pokemon.name}
                            className="w-48 mx-auto"
                        />
                        <div className="flex justify-center space-x-4 mt-4">
                            { pokemon.types.map((type, i) => 
                                <Type key={i} type={type.type.name}/>
                            ) }
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0 md:ml-8">
                        <div className="space-y-2">
                            <p>
                                <span className="font-semibold">Height:</span> {pokemon.height}
                            </p>
                            <p>
                                <span className="font-semibold">Weight:</span> {pokemon.weight}
                            </p>
                            <p>
                                <span className="font-semibold">Base Experience:</span>{' '}
                                {pokemon.base_experience}
                            </p>
                            <div>
                                <span className="font-semibold">Abilities:</span>
                                <ul className="list-disc list-inside ml-4">
                                    {pokemon.abilities.map((ability) => (
                                        <li key={ability.ability.name}>
                                            {ability.ability.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="font-semibold">Stats:</span>
                                <ul className="list-disc list-inside ml-4">
                                    {pokemon.stats.map((stat) => (
                                        <li key={stat.stat.name}>
                                            {stat.stat.name}: {stat.base_stat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="font-semibold">Moves:</span>
                                <ul className="list-disc list-inside ml-4">
                                    {pokemon.moves.slice(0, 5).map((move) => (
                                        <li key={move.move.name}>
                                            {move.move.name}
                                        </li>
                                    ))}
                                    {pokemon.moves.length > 5 && (
                                        <li className="italic">and more...</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        // onClick={() => window.history.back()}
                        onClick={() => navigate(-1)}
                    >
                            Go Back
                    </button>
                </div>
            </div> 
                )
            }
        </section>
    )
    
}
