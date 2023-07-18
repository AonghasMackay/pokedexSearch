'use strict';

async function getPokemon(pokemon, endpoint) {
    let response = await fetch(endpoint + 'pokemon/' + pokemon);
    let responseJson = await response.json();

    return responseJson;
}

export { getPokemon }