function getPokemonCardTemplate(pokemon){
  let type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : "";
    
  return`
    <div class="frontcard" onclick="openDetails(${pokemon.id})">
        <div class="headcard">
          <p>#${pokemon.id}</p>
          <h3>${pokemon.species.name}</h3>
        </div>
        <div class="pokemoncard bg_${pokemon.types[0].type.name}">
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
        <div class="typecard">
          <p class="main-type bg_${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</p>
          ${type2 ? `<p class="secondary-type bg_${pokemon.types[1].type.name}">${type2}</p>` : ''}
        </div>
      </div>
    `
}

function getDialogTemplate(pokemon){
  let type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : "";
  
  return`
    <div id="dialogcard">
      <div class="header-section bg_${pokemon.types[0].type.name}">
        <div class="cry-section bg_${pokemon.types[0].type.name}">
          <button class="cry" onclick="startSound('${pokemon.cries.latest}')"><img class="speaker" src="./assets/icons/josy_dom_alexis-icon-1628258_640.png" alt="Lautsprecher"></button>
          <button class="shiny" onclick="toggleShiny('${pokemon.sprites.other.home.front_default}', '${pokemon.sprites.other.home.front_shiny}')"><p>Toggle Shiny</p></button>
          <button class="cry" onclick="closeDialog()"><p>X</p></button>
        </div>
        <div class="flex-head bg_${pokemon.types[0].type.name}">
        <h3 id="pokemon-id-display">#${pokemon.id}</h3>
        <h3>${pokemon.species.name}</h3>
        <img id="shiny-icon" class="d-none" src="./assets/icons/shiny.png" alt="shiny-icon">
        </div>
        <div class="type-section bg_${pokemon.types[0].type.name}">
        <img class="type-icon" src="./assets/icons/${pokemon.types[0].type.name}.png" alt="type A">
        ${type2 ? `<img class="type-icon" src="./assets/icons/${pokemon.types[1].type.name}.png" alt="type B">` : ''}
      </div>
      <div class="pokemoncard-dialog bg_${pokemon.types[0].type.name}">
        <button id="previous-btn" onclick="changePokemon(-1)"><</button>
        <img id="dialog-img" src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        <button id="next-btn" onclick="changePokemon(1)">></button>
      </div>
      <section class="nav-wrapper">
        <nav class="flex">
          <button class="nav-btn" onclick="renderAbout('about')">About</button>
          <button class="nav-btn" onclick="renderBaseStats('stats')">Base Stats</button>
          <button class="nav-btn" onclick="renderMoves('move')">Move Set</button>
        </nav>
      </section>
      <section id="infocard">
        
      </section>
    </div>
`
}

function errorPokemon(){
  return `${wantedPokemonRef} does not exist.`
}

function renderPokemonNamesSearchbar(pokemon){
  return `
        <div class="suggestion-item" onclick="openDetails('${pokemon.name}')">
        <p class="suggestion-txt">${pokemon.name}</p>
        </div>`;
}

function renderAbout(){
return `
  <div id="general-info">
    <h2>General Information:</h2>
    <div class="flex">
        <p>Height:</p>
        <p>${formatToDimensions(currentPokemon.height)}m</p>
    </div>
    <div class="flex">
        <p>Weight:</p>
        <p>${formatToDimensions(currentPokemon.weight)}kg</p>
    </div>
    <div class="flex">
        <p>Ability:</p>
        <p class="firstLetterUppercase">${currentPokemon.abilities[0].ability.name}</p>
    </div>
  </div>
    `;
}

function renderBaseStats(){

}