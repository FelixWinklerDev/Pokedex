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
    <div class="dialogcard">
      <div class="header-section bg_${pokemon.types[0].type.name}">
        <div class="cry-section bg_${pokemon.types[0].type.name}">
          <button class="cry" onclick="startSound('${pokemon.cries.latest}')"><img class="speaker" src="./assets/icons/josy_dom_alexis-icon-1628258_640.png" alt="Lautsprecher"></button>
          <button onclick="closeDialog()">X</button>
        </div>
        <div class="flex-head bg_${pokemon.types[0].type.name}">
        <p>#${pokemon.id}</p>
        <h3>${pokemon.species.name}</h3>
        </div>
      </div>
      <div class="pokemoncard bg_${pokemon.types[0].type.name}">
        <img class="dialog-img" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
      </div>
      <section class="">
        <div id="general-info">
          <h2>General Information</h2>
          <div class="typecard-dialog">
            <p>Type(s):</p>
            <p class="main-type bg_${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</p>
            ${type2 ? `<p class="secondary-type bg_${pokemon.types[1].type.name}">${type2}</p>` : ''}
          </div>
          <div class="flex">
            <p>Height:</p>
            <p>${formatToDimensions(pokemon.height)}m</p>
          </div>
          <div class="flex">
            <p>Weight:</p>
            <p>${formatToDimensions(pokemon.weight)}kg</p>
          </div>
          <div class="flex">
            <p></p>
            <p></p>
          </div>
        </div>
      </section>
    </div>
`
}