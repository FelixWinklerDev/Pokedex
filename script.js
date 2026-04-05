let currentOffset = 0;
let allPokeNames = [];

async function getPokemonData() {
    showLoading()
    let url = `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${currentOffset}`;
        let response = await fetch(url);
        let currentResponse = await response.json();
    await renderPokemon(currentResponse.results);
    currentOffset += 24;
    hideLoading()
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

function closeDialog() {
  let dialogRef = document.getElementById('dialog-container');
  dialogRef.classList.remove('opened');
  dialogRef.close();
}


function startSound(url){
    let audio = new Audio(url);
    audio.volume = 0.1;
    audio.play();
}

function showLoading() {
    document.getElementById('loading-overlay').classList.remove('d-none');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('d-none');
}

async function findPokemon(){
    let inputRef = document.getElementById('searchInput').value;
    let wantedPokemonRef = inputRef.toLowerCase();
    if (wantedPokemonRef === "") return;

    try{
        showLoading();
        let url = `https://pokeapi.co/api/v2/pokemon/${wantedPokemonRef}`;
        let response = await fetch(url)
    if (!response.ok) {
        throw Error('Pokemon not Found');
        }
        let pokemonDetails = await response.json();
        hideLoading();
        getPokemonCardTemplate(pokemonDetails);
        openDetails(wantedPokemonRef);
    }
    catch(error){
        hideLoading();
        document.getElementById('error-message').innerText = errorPokemon()
    }
}

function formatToDimensions(dimension) {
    let converted = dimension / 10;
    let formatted = converted.toFixed(1); 
    let dotReplace = formatted.replace('.', ',');
    return dotReplace;
}

function filterPokemon(search){
    if (search.length < 2) {
        return [];
    }
    return pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search)
    );
}

async function loadSearchIndex() {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        let data = await response.json();
        allPokeNames = data.results; 
}

async function processSearchInput() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let suggestionsContainer = document.getElementById('suggestions');

    suggestionsContainer.innerHTML = '';

    if (input.length < 3) return;

    let filtered = allPokeNames.filter(p => p.name.includes(input));

    filtered.slice(0, 5).forEach(pokemon => {
        suggestionsContainer.innerHTML += renderPokemonNamesSearchbar(pokemon);
    });
}
