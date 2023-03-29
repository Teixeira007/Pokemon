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

const  viewPokemonData = async (element) =>{
    const selectPokemon = document.getElementById('selectPokemonList').value

    if(selectPokemon === 'default'){
        document.getElementById('predata') && document.getElementById('predata').remove()
        return
    }
    
    let data = document.getElementById('predata')
    if(!data){
        data = document.createElement('pre')
        data.id = 'predata'
    }
        
    

    const pokemonDataRow = await fetch(`${selectPokemon}`)
    const pokemonData = await pokemonDataRow.json()
    // console.log(pokemonData);
    data.innerHTML = `
    <h1 class="name-pokemon">${pokemonData.name}</h1>
    <div class="info">
        <div class="left-info">
            <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonData.id}.svg">
        </div>
        <div class="right-info">
            <div class="info-geral">
                <p>Abilities: ${pokemonData.abilities.reduce((acumulater, element) => {return `${element.ability.name} ${acumulater}`},"")}</p>
                <p>Height: ${(pokemonData.height)/10}m</p>
                <p>Weight: ${(pokemonData.weight)/10}kg</p>
                <p>Base Experience: ${pokemonData.base_experience}</p>
            <div>
            <div class="stats">
                <p>Attack: ${pokemonData.stats[1].base_stat}</p>
                <p>Defense: ${pokemonData.stats[2].base_stat}</p>
                <p>Hp: ${pokemonData.stats[0].base_stat}</p>
                <p>Special Attack: ${pokemonData.stats[3].base_stat}</p>
                <p>Special Defense: ${pokemonData.stats[4].base_stat}</p>
                <p>Speed: ${pokemonData.stats[5].base_stat}</p>
            <div>
        </div>
    </div>

    
    `
    document.getElementById('pokedex-info').append(data)
}

const buildPokemonRootContainer = async (type) =>{
    if(!document.getElementById('pokemonRootContainer')){
        const pokemonRootContainer = document.createElement('div')
        pokemonRootContainer.setAttribute("id", "pokemonRootContainer")
        // const cabecalhoPokemon = document.createElement('h2')
        // cabecalhoPokemon.id = 'selectPokemom'
        // cabecalhoPokemon.textContent = "Choose type"
        // pokemonRootContainer.append(cabecalhoPokemon)
        document.getElementById('pokedex').append(pokemonRootContainer) 


        const selectPokemom = document.createElement('select')
        selectPokemom.id = "selectPokemonList"
        pokemonRootContainer.append(selectPokemom)

        const searchButton = document.createElement('input')
        searchButton.type = 'submit'
        searchButton.value = 'Buscar'
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

    pokemonData = await fetch(`${type}`)
    pokemons = await pokemonData.json()
    pokemons.pokemon.forEach(element => {
        const optionPokemon = document.createElement('option')
        optionPokemon.innerText = element.pokemon.name
        optionPokemon.value = element.pokemon.url
        pokemonList.append(optionPokemon)
    });
    pokemonDefault.innerText = 'Escolha um pokemon...'
    // console.log(pokemons.pokemon);

}

async function destroyPokemonRootContainer(){
    if(document.getElementById('pokemonRootContainer'))
        document.getElementById('pokemonRootContainer').remove()
        
    if(document.getElementById('see-info'))
        document.getElementById('see-info').removeEventListener('click', viewPokemonData)
}

async function addPokemonList(type){
    state.pokemonRootContainerEnable ?
    buildPokemonRootContainer(type) :
    destroyPokemonRootContainer();
}


async function selectType(){
    const type = document.getElementById('select-types').value
    state.pokemonRootContainerEnable = !(type === "default")
    // console.log(type);
    addPokemonList(type)
}

window.addEventListener('load', loadTypes)
document.getElementById('select-types').addEventListener('change', selectType);