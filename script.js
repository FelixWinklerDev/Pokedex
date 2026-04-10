let currentOffset = 0;
let allPokeNames = [];
let currentPokemon;

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
        currentPokemon = pokeData; 
        dialogRef.innerHTML = getDialogTemplate(pokeData);
        dialogRef.showModal();
        renderInInfocard('about');
        getDescription(id)
    } catch (error) {
        console.error("Fehler beim Laden der Details:", error);
    }
}

async function getDescription(id) {
    let descriptionRef = document.getElementById('giveDescription');
    try {
        let descResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        let descData = await descResponse.json();
        let descEntry = descData.flavor_text_entries.find(entry => entry.language.name === 'en');
        let cleanText = descEntry.flavor_text.replace(/\s+/g, ' ').trim();
        descriptionRef.innerText = cleanText;
    } catch (error) {
        console.error("description not found", error);
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
    let errorRef = document.getElementById('error-message');
    errorRef.innerText = "";
    if (wantedPokemonRef === "") return;
    findWantedPokemon();
}

async function findWantedPokemon() {
    let errorRef = document.getElementById('error-message');
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
        errorRef.innerText = errorPokemon(wantedPokemonRef);
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

function toggleShiny(normal, shiny) {
    let imgElement = document.getElementById('dialog-img');
    let shinyIcon = document.getElementById('shiny-icon');
    if (imgElement.src === shiny) {
        imgElement.src = normal;
        shinyIcon.classList.add('d-none');
    } else {
        imgElement.src = shiny;
        shinyIcon.classList.remove('d-none');
    }
}

function changePokemon(direction) {
    let idText = document.getElementById('pokemon-id-display').innerText;
    let currentId = parseInt(idText.replace('#', ''));
    let newId = currentId + direction;
    if (newId < 1) {
    previousBtn.innerHTML = `<p class="disabled">X</p>`
    return;
    }
    openDetails(newId);
}

function renderInInfocard(tab) {
    let cardRef = document.getElementById('infocard');
    cardRef.innerHTML = "";
    if (tab === 'about') {
        cardRef.innerHTML = renderAbout();
        getDescription(currentPokemon.id);
    } else if (tab === 'stats') {
        cardRef.innerHTML = renderBaseStats();
        const max = 200;
        let kp = currentPokemon.stats[0].base_stat;
        document.getElementById("kpProgressbar").style.width = (kp / max * 100) + "%";
        let attack = currentPokemon.stats[1].base_stat;
        document.getElementById("attackProgressbar").style.width = (attack / max * 100) + "%";
        let defense = currentPokemon.stats[2].base_stat;
        document.getElementById("defenseProgressbar").style.width = (defense / max * 100) + "%";
        let spattack = currentPokemon.stats[3].base_stat;
        document.getElementById("spattackProgressbar").style.width = (spattack / max * 100) + "%";
        let spdefense = currentPokemon.stats[4].base_stat;
        document.getElementById("spdefenseProgressbar").style.width = (spdefense / max * 100) + "%";
        let speed = currentPokemon.stats[5].base_stat;
        document.getElementById("speedProgressbar").style.width = (speed / max * 100) + "%";
    }
}