// declaring 3 constants by getting id
const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");
const pokemonList = document.getElementById("pokemonList");

async function searchPokemon() {
  const query = input.value.trim();

  //   if query is empty and enter is clicked show this
  if (!query) {
    pokemonList.innerHTML = `<p class="text-warning">Please enter a Pokémon name or ID.</p>`;
    return;
  }

  try {
    // Shows loading message. Enter random strings like "gg" in search bar + enter or click to show and then will show an error message
    pokemonList.innerHTML = `<p class="text-light">Loading...</p>`;

    // fetching data from api passing the query variable as part of the url
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    // error handling: this will show up on conolse in dev tools
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();

    // padstart only works with strings so we convert the input to a string then adjust the target length followed by what character we add if the string does'nt meet the required length
    const id = data.id.toString().padStart(4, "0");
    // official artwork has a - therefoe I am not able to use a dot notation so opted for brackets
    const image = data.sprites.other["official-artwork"].front_default;

    const types = data.types.map((t) => t.type.name);

    // Update the DOM with the fetched Pokémon
    pokemonList.innerHTML = `
        <div class="position-relative text-uppercase bg-secondary text-warning border border-2 border-primary rounded-3 overflow-hidden" style="isolation: isolate">
          <p class=" start-50 translate-middle-x position-absolute text-dark opacity-50" style="font-size: 8rem; z-index: -1">
          #${id}
          </p>
          <div>
          <img class="w-50 mx-auto d-block" src="${image}" alt="${data.name}" />
          </div>
          <div>
          <div class="numberContainer text-dark d-flex flex-wrap justify-content-center gap-2">
          <p class="pokemonID">#${id}</p>
          <h2 class=" fs-3">${data.name}</h2>
          </div>
          <div class=" d-flex flex-wrap justify-content-center gap-2" style="font-size: 12px">
          ${types
            .map(
              (type) =>
                // added type.tolowercase because style sheet is case sensitive
                `<p class=" ${type.toLowerCase()} text-center rounded px-3 py-1">${type}</p>`
            )
            .join("")}
                </div>
                </div>
                </div>
                `;
  } catch (error) {
    pokemonList.innerHTML = `<p class="text-danger fw-bold">Pokémon not found. Please try again.</p>`;
  }
  //   clears search bar after query ex: search 4 or charmander and iot clears the search bar for new input
  input.value = "";
}

// Trigger search on click
button.addEventListener("click", searchPokemon);

// Trigger search on Enter key
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPokemon();
  }
});
