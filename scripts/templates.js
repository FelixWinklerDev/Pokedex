function getPokemonCardTemplate(pokemon){
  let type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : "";
    
  return`
    <div class="frontcard">
        <div class="headcard">
          <p>#${pokemon.id}</p>
          <h3>${pokemon.species.name}</h3>
        </div>
        <div class="pokemoncard">
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
        <div class="typecard">
          <p class="main-type">${pokemon.types[0].type.name}</p>
          ${type2 ? `<p class="secondary-type">${type2}</p>` : ''}
        </div>
      </div>
    `
}