async function fetchDataJson() {
    let container = document.getElementById('content');

    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    let responseAsJson = await response.json();

    responseAsJson.forEach(pokemon => {
        container.innerHTML += getPokemonCardTemplate(pokemon); 
    });
}