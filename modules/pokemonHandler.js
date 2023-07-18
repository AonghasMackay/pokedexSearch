'use strict';

/**
 * Get a specific pokemons details from the API
 * @param {object} pokemon 
 * @param {string} endpoint 
 * @returns {object}
 * @async
 */
async function getPokemon(pokemon, endpoint) {
    let response = await fetch(endpoint + 'pokemon/' + pokemon);
    let responseJson = await response.json();

    return responseJson;
}

/**
 * Fills the pokemon details template with the pokemon data
 * @param {object} pokemonJSON 
 * @param {documentFragment} documentFragment 
 * @returns {DocumentFragment}
 */
function fillPokemonData(pokemonJSON, documentFragment) {
    //set pokemon name and sprite
    documentFragment.querySelector('#pokemonName').textContent = pokemonJSON.name;
    documentFragment.querySelector('#pokemonSprite').src = pokemonJSON.sprites.front_default;

    //create and append the pokemon detail elements
    const statsCollapse = createStatsCollapse(pokemonJSON);
    documentFragment.querySelector('#pokemonDetails').appendChild(statsCollapse);

    const weightElem = createWeightElem(pokemonJSON);
    documentFragment.querySelector('#pokemonDetails').appendChild(weightElem);

    const heightElem = createHeightElem(pokemonJSON);
    documentFragment.querySelector('#pokemonDetails').appendChild(heightElem);

    const typesElem = createTypesElem(pokemonJSON);
    documentFragment.querySelector('#pokemonDetails').appendChild(typesElem);

    const movesCollapse = createMovesCollapse(pokemonJSON);
    documentFragment.querySelector('#pokemonDetails').appendChild(movesCollapse);

    const appearsInCollapse = createAppearsInCollapse(pokemonJSON);
    documentFragment.querySelector('#pokemonDetails').appendChild(appearsInCollapse);

    return documentFragment;
}

/**
 * Create a DocumentFragment showing which games the pokemon appears in
 * @param {object} pokemonJSON 
 * @returns {DocumentFragment}
 */
function createAppearsInCollapse(pokemonJSON) {
    const detailsCollapseTemplate = document.querySelector('#pokemonDetailsCollapseTemplate');

    let appearsInCollapse = detailsCollapseTemplate.content.cloneNode(true);
    appearsInCollapse.querySelector('#pokemonDetailsCollapseSummary').innerHTML = '<strong>Appears in</strong>';

    pokemonJSON.game_indices.forEach(game => {
        const gameNode = document.createElement('span');
        gameNode.innerHTML = `${game.version.name}, `;

        appearsInCollapse.querySelector('#pokemonDetailsCollapseContent').appendChild(gameNode);
    });

    return appearsInCollapse;
}

/**
 * Create an element the pokemons height
 * @param {object} pokemonJSON 
 * @returns {Element}
 */
function createHeightElem(pokemonJSON) {
    const heightElem = document.createElement('span');
    const pokemonHeight = pokemonJSON.height / 10;

    heightElem.innerHTML = `<strong>Height:</strong> ${pokemonHeight}m <br />`;

    return heightElem;
}

/**
 * Create a DocumentFragment showing the pokemons possible moves
 * @param {object} pokemonJSON 
 * @returns {DocumentFragment}
 */
function createMovesCollapse(pokemonJSON) {
    const detailsCollapseTemplate = document.querySelector('#pokemonDetailsCollapseTemplate');

    let movesCollapse = detailsCollapseTemplate.content.cloneNode(true);
    movesCollapse.querySelector('#pokemonDetailsCollapseSummary').innerHTML = '<strong>Moves</strong>';

    pokemonJSON.moves.forEach(move => {
        const moveNode = document.createElement('span');
        moveNode.innerHTML = `${move.move.name}, `;

        movesCollapse.querySelector('#pokemonDetailsCollapseContent').appendChild(moveNode);
    });

    return movesCollapse;
}

/**
 * Create an element showing the pokemons types
 * @param {object} pokemonJSON 
 * @returns {Element}
 */
function createTypesElem(pokemonJSON) {
    const typesElem = document.createElement('span');
    typesElem.innerHTML = '<strong>Types:</strong> ';

    pokemonJSON.types.forEach(type => {
        typesElem.innerHTML += `${type.type.name}, `;
    });
    //remove trailing comma
    typesElem.innerHTML = typesElem.innerHTML.slice(0, -2);

    typesElem.innerHTML += '<br />';

    return typesElem;
}

/**
 * Create an element showing the pokemons weight
 * @param {object} pokemonJSON 
 * @returns {Element}
 */
function createWeightElem(pokemonJSON) {
    const weightElem = document.createElement('span');
    const pokemonWeight = pokemonJSON.weight / 10;

    weightElem.innerHTML = `<strong>Weight:</strong> ${pokemonWeight}kg <br />`;

    return weightElem;
}

/**
 * Create an element showing the pokemons base stats
 * @param {object} pokemonJSON 
 * @returns {DocumentFragment}
 */
function createStatsCollapse(pokemonJSON) {
    const detailsCollapseTemplate = document.querySelector('#pokemonDetailsCollapseTemplate');

    let statsCollapse = detailsCollapseTemplate.content.cloneNode(true);
    statsCollapse.querySelector('#pokemonDetailsCollapseSummary').innerHTML = '<strong>Stats</strong>';

    pokemonJSON.stats.forEach(stat => {
        const statNode = document.createElement('span');
        statNode.innerHTML = `<strong>${stat.stat.name}:</strong> ${stat.base_stat} <br />`;

        statsCollapse.querySelector('#pokemonDetailsCollapseContent').appendChild(statNode);
    });

    return statsCollapse;
}

export { getPokemon, fillPokemonData }