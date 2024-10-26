// Base URL for the PokeAPI Proxy
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

// Event listener for the search button
document
  .getElementById("search-button")
  .addEventListener("click", searchPokemon);

function searchPokemon() {
  const query = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();

  // Check if input is empty
  if (!query) {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  fetch(API_BASE_URL + query)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => displayPokemonData(data))
    .catch((error) => {
      alert(error.message);
      clearPokemonData();
    });
}

function displayPokemonData(data) {
  // Set Pokémon name and ID
  document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
  document.getElementById("pokemon-id").textContent = `#${data.id}`;

  // Set weight and height
  document.getElementById("weight").textContent = `Weight: ${data.weight}`;
  document.getElementById("height").textContent = `Height: ${data.height}`;

  // Set stats
  data.stats.forEach((stat) => {
    switch (stat.stat.name) {
      case "hp":
        document.getElementById("hp").textContent = stat.base_stat;
        break;
      case "attack":
        document.getElementById("attack").textContent = stat.base_stat;
        break;
      case "defense":
        document.getElementById("defense").textContent = stat.base_stat;
        break;
      case "special-attack":
        document.getElementById("special-attack").textContent = stat.base_stat;
        break;
      case "special-defense":
        document.getElementById("special-defense").textContent = stat.base_stat;
        break;
      case "speed":
        document.getElementById("speed").textContent = stat.base_stat;
        break;
      default:
        break;
    }
  });

  // Set types
  const typesElement = document.getElementById("types");
  typesElement.innerHTML = ""; // Clear previous types
  data.types.forEach((typeInfo) => {
    const typeItem = document.createElement("li");
    typeItem.textContent = typeInfo.type.name.toUpperCase();
    typesElement.appendChild(typeItem);
  });

  // Set sprite image
  const spriteElement = document.getElementById("sprite");
  spriteElement.src = data.sprites.front_default;
  spriteElement.style.display = "block";

  // Display the Pokémon info container
  document.querySelector(".pokemon-info").style.display = "block";
}

function clearPokemonData() {
  document.getElementById("pokemon-name").textContent = "";
  document.getElementById("pokemon-id").textContent = "";
  document.getElementById("weight").textContent = "";
  document.getElementById("height").textContent = "";
  document.getElementById("hp").textContent = "";
  document.getElementById("attack").textContent = "";
  document.getElementById("defense").textContent = "";
  document.getElementById("special-attack").textContent = "";
  document.getElementById("special-defense").textContent = "";
  document.getElementById("speed").textContent = "";
  document.getElementById("types").innerHTML = "";
  document.getElementById("sprite").style.display = "none";

  // Hide the Pokémon info container
  document.querySelector(".pokemon-info").style.display = "none";
}
