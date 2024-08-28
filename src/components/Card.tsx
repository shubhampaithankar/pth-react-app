import { Type } from './'
import { Pokemon } from '../utils/Types'

export default function Card({ pokemon }: { pokemon: Pokemon }) {
    const {sprites, name, abilities, id, stats, types} = pokemon
    const total = stats.reduce((acc, curr) => acc + curr.base_stat, 0)
    return (
        <div className="w-[350px] max-h-[600px] relative">
            <div className="relative w-full p-7 shadow-lg rounded-lg bg-white">
                <img
                    src={sprites.other['official-artwork'].front_default!}
                    alt={name}
                    className="block w-[180px] max-h-[200px] mx-auto my-5"
                />
                <div className="hp w-[80px] bg-white text-center py-2 rounded-full ml-auto font-light">
                    <span className="text-xs tracking-wider font-semibold">#{id}</span>
                </div>
                <h2 className="poke-name text-center font-semibold text-lg mt-3">{name}</h2>
                <div className="types flex justify-around my-5">
                    { types.map((type, i) => 
                        <Type key={i} type={type.type.name}/>
                    ) }
                </div>
                <div className="stats flex items-center justify-between text-center">
                    { stats.map(({ stat, base_stat }, i) => 
                        <p key={i} className="text-[#404060]">{stat.name}: {base_stat}</p>
                    ) }
                    <p className="text-[#404060]">Total: {total}</p>
                </div>
                <button
                    id="btn"
                    className="block px-[60px] py-4 text-lg bg-black text-white mt-8 mx-auto rounded-md"
                >
                Capture
                </button>
            </div>
        </div>

    )
}