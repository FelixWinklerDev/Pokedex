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
      <div class="header-section">
        <div class="cry-section">
          <button class="cry" onclick="startSound('${pokemon.cries.latest}')">Cry</button>
        </div>
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
      <progress id="progress-bar">
      </progress>
    </div>
`
}