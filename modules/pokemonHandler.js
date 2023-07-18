'use strict';

async function getPokemon(pokemon, endpoint) {
    let response = await fetch(endpoint + 'pokemon/' + pokemon);
    let responseJson = await response.json();

    return responseJson;
}

function fillPokemonData(pokemonJSON, documentFragment) {
    documentFragment.querySelector('#pokemonName').textContent = pokemonJSON.name;
    documentFragment.querySelector('#pokemonSprite').src = pokemonJSON.sprites.front_default;

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

    console.log(pokemonJSON);

    return documentFragment;
}

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

function createHeightElem(pokemonJSON) {
    const heightElem = document.createElement('span');
    const pokemonHeight = pokemonJSON.height / 10;

    heightElem.innerHTML = `<strong>Height:</strong> ${pokemonHeight}m <br />`;

    return heightElem;
}

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

function createWeightElem(pokemonJSON) {
    const weightElem = document.createElement('span');
    const pokemonWeight = pokemonJSON.weight / 10;

    weightElem.innerHTML = `<strong>Weight:</strong> ${pokemonWeight}kg <br />`;

    return weightElem;
}

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