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

    console.log(pokemonJSON);

    return documentFragment;
}

function createStatsCollapse(pokemonJSON) {
    const detailsCollapseTemplate = document.querySelector('#pokemonDetailsCollapseTemplate');

    let statsCollapse = detailsCollapseTemplate.content.cloneNode(true);
    statsCollapse.querySelector('#pokemonDetailsCollapseSummary').innerHTML = 'Stats';

    pokemonJSON.stats.forEach(stat => {
        const statNode = document.createElement('span');
        statNode.innerHTML = `<strong>${stat.stat.name}:</strong> ${stat.base_stat} <br />`;

        statsCollapse.querySelector('#pokemonDetailsCollapseContent').appendChild(statNode);
    });

    return statsCollapse;
}

export { getPokemon, fillPokemonData }