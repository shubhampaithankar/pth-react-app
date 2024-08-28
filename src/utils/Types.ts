// API TYPES
export type LoginResponse = {
    ack: number,
    token?: string,
    user?: User
    error?: string
}

export type RegisterResponse = {
    ack: number,
    error?: string
}

// AUTH TYPES
export type AuthContextType = {
    isAuthenticated: boolean, 
    user: User | null, 
    token: string | null, 
    login: (user: User, token: string) => void, 
    logout: () => void
}

export type User = {
    username: string,
    id: string,
    pokemon: Pokemon[]
}


// POKEMON TYPES
export type Pokemon = {
    abilities: Ability[];
    id: number;
    name: string;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
};

export type Ability = {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};

export type Stat = {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
};

export type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    };
};

export type Sprites = {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string | null;
            front_female: string | null;
        };
        home: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        'official-artwork': {
            front_default: string | null;
            front_shiny: string | null;
        };
        showdown: {
            back_default: string | null;
            back_female: string | null;
            back_shiny: string | null;
            back_shiny_female: string | null;
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
    };
    versions: {
        'generation-i': {
            'red-blue': {
                back_default: string | null;
                back_gray: string | null;
                back_transparent: string | null;
                front_default: string | null;
                front_gray: string | null;
                front_transparent: string | null;
            };
            yellow: {
                back_default: string | null;
                back_gray: string | null;
                back_transparent: string | null;
                front_default: string | null;
                front_gray: string | null;
                front_transparent: string | null;
            };
        };
        'generation-ii': {
            crystal: {
                back_default: string | null;
                back_shiny: string | null;
                back_shiny_transparent: string | null;
                back_transparent: string | null;
                front_default: string | null;
                front_shiny: string | null;
                front_shiny_transparent: string | null;
                front_transparent: string | null;
            };
            gold: {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
                front_transparent: string | null;
            };
            silver: {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
                front_transparent: string | null;
            };
        };
        'generation-iii': {
            emerald: {
                front_default: string | null;
                front_shiny: string | null;
            };
            'firered-leafgreen': {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
            };
            'ruby-sapphire': {
                back_default: string | null;
                back_shiny: string | null;
                front_default: string | null;
                front_shiny: string | null;
            };
        };
        'generation-iv': {
            'diamond-pearl': {
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            'heartgold-soulsilver': {
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            platinum: {
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-v': {
            'black-white': {
                animated: {
                    back_default: string | null;
                    back_female: string | null;
                    back_shiny: string | null;
                    back_shiny_female: string | null;
                    front_default: string | null;
                    front_female: string | null;
                    front_shiny: string | null;
                    front_shiny_female: string | null;
                };
                back_default: string | null;
                back_female: string | null;
                back_shiny: string | null;
                back_shiny_female: string | null;
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-vi': {
            'omegaruby-alphasapphire': {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
            'x-y': {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-vii': {
            icons: {
                front_default: string | null;
                front_female: string | null;
            };
            'ultra-sun-ultra-moon': {
                front_default: string | null;
                front_female: string | null;
                front_shiny: string | null;
                front_shiny_female: string | null;
            };
        };
        'generation-viii': {
            icons: {
                front_default: string | null;
                front_female: string | null;
            };
        };
    };
};

export type PokemonDetail = {
    abilities: Ability[];
    base_experience: number | null;
    forms: any[];
    game_indices: number[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    past_abilities: any[];
    past_types: any[];
    species: any;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
    [property: string]: any;
}
