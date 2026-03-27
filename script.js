let currentOffset = 0;

async function getPokemonData() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`;
    let response = await fetch(url);
    let currentResponse = await response.json();

    renderPokemon(currentResponse.results);

    currentOffset += 20;
}

async function renderPokemon(pokemonList) {
    let contentContainer = document.getElementById('content');

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemonShortInfo = pokemonList[i];

        let detailResponse = await fetch(pokemonShortInfo.url);
        let pokemonDetails = await detailResponse.json();

        contentContainer.innerHTML += getPokemonCardTemplate(pokemonDetails);
    }
}