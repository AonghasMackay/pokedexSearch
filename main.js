/**
 * Useful links for project:
 * https://github.com/PokeAPI/sprites
 * https://github.com/PokeAPI/pokeapi/issues/346
 * https://pokeapi.co/
 */

'use strict';

const ENDPOINT = 'https://pokeapi.co/api/v2/';
const SEARCHBAR = document.querySelector('#searchbar');
const pokemonCache = {
    allPokemon: []
};
let search = '';

//when document is ready in vanilla js
document.addEventListener("DOMContentLoaded", function() {
    initialise();
});

function initialise() {
    fillCache();

    SEARCHBAR.addEventListener('input', searchPokemon);
}

async function fillCache() {
    let response = await fetch(ENDPOINT + 'pokemon/?limit=3000&offset=0');
    let responseJson = await response.json();

    pokemonCache.allPokemon = responseJson.results;
}

function searchPokemon(inputEvent) {
    search = inputEvent.target.value;

    if (search.length < 1) {
        return;
    }

    //search in cache for pokemon containing search string
    //put pokemon that start with search string first
    let searchResults = pokemonCache.allPokemon.filter(pokemon => pokemon.name.includes(search));
    let searchResultsStartsWith = searchResults.filter(pokemon => pokemon.name.startsWith(search));
    let searchResultsContains = searchResults.filter(pokemon => !pokemon.name.startsWith(search));
    console.log(searchResultsStartsWith);
    console.log(searchResultsContains);
}