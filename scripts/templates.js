function getPokemonCardTemplate(pokemon){
    return`
    <div class="frontcard">
        <div class="headcard">
          <p>#${pokemon.order}</p>
          <h3>${pokemon.species.name}</h3>
        </div>
        <div class="pokemoncard">
          <img src="${pokemon.sprites.back_default}" alt="Pokèmon sprite">
        </div>
        <div class="typecard">
          <p class="main-type">${pokemon.types.type.name}</p>
          <p class="secondary-type">${pokemon.types.type.name}</p> 
        </div>
      </div>
    `
}