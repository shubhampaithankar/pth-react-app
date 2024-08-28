export default function Type({ type }: { type: string }) {
    const color = types[type]
    return <div style={{ backgroundColor: color }} className='px-5 py-1 rounded-full text-white'>{type}</div>
}

const types: any = {
    'grass': '#78C850',
    'fire': '#F08030',
    'water': '#6890F0',
    'electric': '#F8D030',
    'ice': '#98D8D8',
    'fighting': '#C03028',
    'poison': '#A040A0',
    'ground': '#E0C068',
    'flying': '#A890F0',
    'psychic': '#F85888',
    'bug': '#A8B820',
    'rock': '#B8A038',
    'ghost': '#705898',
    'dark': '#705848',
    'dragon': '#7038F8',
    'steel': '#B8B8D0',
    'fairy': '#EE99AC',
    'normal': '#A8A878'
}
  
