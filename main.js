/**
 * Useful links for project:
 * https://github.com/PokeAPI/sprites
 * https://github.com/PokeAPI/pokeapi/issues/346
 * https://pokeapi.co/
 */

'use strict';

/**
 * Constants
 */
const ENDPOINT = 'https://pokeapi.co/api/v2/';
//So we can cache the results of the API call and not have to call it repeatedly for each search
const POKEMON_CACHE = {
    allPokemon: []
};

//DOM elements and templates
const MAIN_CONTENT_CONTAINER = document.querySelector('#mainContent');
const SEARCH_PAGE_TEMPLATE = document.querySelector('#searchPageTemplate');
const SEARCH_RESULT_TEMPLATE = document.querySelector('#searchResultTemplate');

/**
 * Global variables
 */
let search = '';
//needs to be accessible globally
let searchResultsContainer;

document.addEventListener("DOMContentLoaded", function() {
    initialise();
});

/**
 * Initialises the page
 * @returns {void}
 */
function initialise() {
    //fill the cache with all the pokemon
    fillCache();
    //clone the search page template and add it to the DOM
    setupPage();

    //add event listener to search bar
    const searchBar = document.querySelector('#searchbar');
    searchBar.addEventListener('input', searchPokemon);
}

/**
 * Fills the cache with all pokemon
 * @returns {void}
 * @async
 */
async function fillCache() {
    //fetch all pokemon
    let response = await fetch(ENDPOINT + 'pokemon/?limit=3000&offset=0');
    let responseJson = await response.json();

    //fill cache
    POKEMON_CACHE.allPokemon = responseJson.results;
}

/**
 * Clones the search page template and adds it to the DOM
 * Then sets the searchResultsContainer global variable
 * @returns {void}
 */
function setupPage() {
    const node = SEARCH_PAGE_TEMPLATE.content.cloneNode(true);
    MAIN_CONTENT_CONTAINER.appendChild(node);

    searchResultsContainer = document.querySelector('#searchResultsContainer');
}

/**
 * Clears the search results container
 * @returns {void}
 */
function clearSearchResults() {
    searchResultsContainer.innerHTML = '';
}

/**
 * Filter the pokemon in the cache by search string
 * @param {string} search 
 * @returns {Array}
 */
function getSearchResults(search) {
    //search in cache for pokemon containing search string
    //put the pokemon that start with search string first
    const searchResults = POKEMON_CACHE.allPokemon.filter(pokemon => pokemon.name.includes(search));
    const searchResultsStartsWith = searchResults.filter(pokemon => pokemon.name.startsWith(search));
    const searchResultsContains = searchResults.filter(pokemon => !pokemon.name.startsWith(search));
    
    //add pokemon that don't start with search string to the end of the array of pokemon that do
    const combinedSearchResults = searchResultsStartsWith.concat(searchResultsContains);

    return combinedSearchResults;
}

/**
 * Clones the search result template, fills it with the pokemon data, sets up the event listeners and adds it to the DOM
 * @param {object} pokemon 
 * @returns {void}
 */
function cloneSearchResultTemplate(pokemon) {
    //clone the document fragment
    const searchResultNode = SEARCH_RESULT_TEMPLATE.content.cloneNode(true);
    //assign the button
    const nodeButton = searchResultNode.querySelector('a');

    //fill the template with the pokemon data
    searchResultNode.querySelector('#pokemonName').innerText = pokemon.name;
    nodeButton.setAttribute('data-pokemon-name', pokemon.name);

    nodeButton.addEventListener('click', function() {
        alert('You clicked on ' + pokemon.name);
    });

    searchResultsContainer.appendChild(searchResultNode);
}

/**
 * Takes the input from the search bar and handles the search logic and updating the search results
 * @param {InputEvent} inputEvent 
 * @returns {void}
 */
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