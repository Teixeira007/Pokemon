const state = {
    pokemonRootContainerEnable: false,
}

async function loadTypes(){
    const types = await fetch("https://pokeapi.co/api/v2/type/")
    const typesData =  await types.json();

    const selectTypes = document.getElementById("select-types")

    typesData.results.forEach(element => {
        const option = document.createElement('option');
        option.innerText = element.name;
        option.value = element.url;
        selectTypes.append(option);
    });

    const typeDefault = document.getElementById("default-species");
    typeDefault.innerText = "Loading species..."

} 

const buildPokemonRootContainer = async (type) =>{
    if(!document.getElementById('pokemonRootContainer')){
        const pokemonRootContainer = document.createElement('div')
        pokemonRootContainer.setAttribute("id", "pokemonRootContainer")
        const cabecalhoPokemon = document.createElement('h2')
        cabecalhoPokemon.id = 'selectPokemom'
        cabecalhoPokemon.textContent = "Choose type"
        pokemonRootContainer.append(cabecalhoPokemon)
        document.body.append(pokemonRootContainer) 


        const selectPokemom = document.createElement('select')
        selectPokemom.id = "selectPokemonList"
        pokemonRootContainer.append(selectPokemom)

        const searchButton = document.createElement('input')
        searchButton.type = 'submit'
        searchButton.value = 'See info'
        searchButton.id = 'see-info'
        pokemonRootContainer.append(searchButton)

        document.getElementById('see-info').addEventListener('click', viewPokemonData)
    
    }

    const pokemonList = document.getElementById('selectPokemonList')
    pokemonList.textContent = ''

    const pokemonDefault = document.createElement('option')
    pokemonDefault.id = 'pokemonDefault'
    pokemonDefault.innerText = "Loading pokemons..."
    pokemonDefault.value = "default"
    pokemonList.append(pokemonDefault)

    const p = await fetch(`${type}`)
    const json = await p.json()
    console.log(json);

}

async function viewPokemonData(){
    console.log("reeee");
}

async function destroyPokemonRootContainer(){
    console.log("destroy");
}

async function addPokemonList(type){
    state.pokemonRootContainerEnable ?
    buildPokemonRootContainer(type) :
    destroyPokemonRootContainer();
}


async function selectType(){
    const type = document.getElementById('select-types').value
    state.pokemonRootContainerEnable = !(type === "default")
    console.log(type);
    addPokemonList(type)
}

window.addEventListener('load', loadTypes)
document.getElementById('select-types').addEventListener('change', selectType);