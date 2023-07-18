/**
 * Useful links for project:
 * https://github.com/PokeAPI/sprites
 * https://github.com/PokeAPI/pokeapi/issues/346
 * https://pokeapi.co/
 */

'use strict';

const ENDPOINT = 'https://pokeapi.co/api/v2/';
const POKEMON_CACHE = {
    allPokemon: []
};
const MAIN_CONTENT_CONTAINER = document.querySelector('#mainContent');
const SEARCH_PAGE_TEMPLATE = document.querySelector('#searchPageTemplate');
const SEARCH_RESULT_TEMPLATE = document.querySelector('#searchResultTemplate');

let search = '';
let searchResultsContainer;

//when document is ready in vanilla js
document.addEventListener("DOMContentLoaded", function() {
    initialise();
});

function initialise() {
    fillCache();
    setupPage();

    const searchBar = document.querySelector('#searchbar');
    searchBar.addEventListener('input', searchPokemon);
}

async function fillCache() {
    let response = await fetch(ENDPOINT + 'pokemon/?limit=3000&offset=0');
    let responseJson = await response.json();

    POKEMON_CACHE.allPokemon = responseJson.results;
}

function setupPage() {
    const node = SEARCH_PAGE_TEMPLATE.content.cloneNode(true);
    MAIN_CONTENT_CONTAINER.appendChild(node);

    searchResultsContainer = document.querySelector('#searchResultsContainer');
}

function clearSearchResults() {
    searchResultsContainer.innerHTML = '';
}

function getSearchResults(search) {
    //search in cache for pokemon containing search string
    //put the pokemon that start with search string first
    const searchResults = POKEMON_CACHE.allPokemon.filter(pokemon => pokemon.name.includes(search));
    const searchResultsStartsWith = searchResults.filter(pokemon => pokemon.name.startsWith(search));
    const searchResultsContains = searchResults.filter(pokemon => !pokemon.name.startsWith(search));
    
    const combinedSearchResults = searchResultsStartsWith.concat(searchResultsContains);

    return combinedSearchResults;
}

function cloneSearchResultTemplate(pokemon) {
    const searchResultNode = SEARCH_RESULT_TEMPLATE.content.cloneNode(true);
    const nodeButton = searchResultNode.querySelector('a');

    searchResultNode.querySelector('#pokemonName').innerText = pokemon.name;
    nodeButton.setAttribute('data-pokemon-name', pokemon.name);

    nodeButton.addEventListener('click', function() {
        alert('You clicked on ' + pokemon.name);
    });

    searchResultsContainer.appendChild(searchResultNode);
}

function searchPokemon(inputEvent) {
    search = inputEvent.target.value;

    if (search.length < 1) {
        return;
    }

    clearSearchResults();

    let searchResults = getSearchResults(search);

    searchResults.forEach(pokemon => {
        cloneSearchResultTemplate(pokemon);
    });
}