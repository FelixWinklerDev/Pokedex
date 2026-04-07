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
    } catch (error) {
        console.error("Fehler beim Laden der Details:", error);
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
    if (newId < 1) return;
    openDetails(newId);
}

function renderInInfocard(tab) {
    let cardRef = document.getElementById('infocard');
    if (!cardRef) return;
    cardRef.innerHTML = "";

    if (tab === 'about') {
        cardRef.innerHTML = renderAbout();
    } else if (tab === 'stats') {
        cardRef.innerHTML = renderBaseStats();
        const max = 200;

        let kp = currentPokemon.stats[0].base_stat;
        document.getElementById("kpProgressbar").style.width = (kp / max * 100) + "%";
        document.getElementById("kpProgressbar").innerText = kp;

        let attack = currentPokemon.stats[1].base_stat;
        document.getElementById("attackProgressbar").style.width = (attack / max * 100) + "%";
        document.getElementById("attackProgressbar").innerText = attack;

        let defense = currentPokemon.stats[2].base_stat;
        document.getElementById("defenseProgressbar").style.width = (defense / max * 100) + "%";
        document.getElementById("defenseProgressbar").innerText = defense;

        let spattack = currentPokemon.stats[3].base_stat;
        document.getElementById("spattackProgressbar").style.width = (spattack / max * 100) + "%";
        document.getElementById("spattackProgressbar").innerText = spattack;

        let spdefense = currentPokemon.stats[4].base_stat;
        document.getElementById("spdefenseProgressbar").style.width = (spdefense / max * 100) + "%";
        document.getElementById("spdefenseProgressbar").innerText = spdefense;

        let speed = currentPokemon.stats[5].base_stat;
        document.getElementById("speedProgressbar").style.width = (speed / max * 100) + "%";
        document.getElementById("speedProgressbar").innerText = speed;
    } else if (tab === 'move') {
        cardRef.innerHTML = renderMoveSet(); 
    }
}
