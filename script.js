let currentOffset = 0;

async function getPokemonData() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${currentOffset}`;
        let response = await fetch(url);
        let currentResponse = await response.json();
    await renderPokemon(currentResponse.results);
    currentOffset += 24;
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

async function openDetails(id) {
    let dialogRef = document.getElementById('dialog-container');

    try {
        let responseForDialog = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let pokeData = await responseForDialog.json();

        dialogRef.innerHTML = getDialogTemplate(pokeData);
        dialogRef.showModal();
        dialogRef.classList.add('opened');
    } catch (error) {
        console.error(error);
    }
}

function startSound(url){
    let audio = new Audio(url);
    audio.volume = 0.05;
    audio.play();
}