//Funcion para buscar un pokemon

function searchPoke() {
    let input = 'pokeInput';
    let pokeName = document.getElementById(input).value.trim().toLowerCase();
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(urlApi)
        .then(response => response.json())
        .then(data => {
            let pokeImg = data.sprites.other['official-artwork'].front_default;
            let pokeName = data.name;
            let pokeId = data.id;
            let pokeHp = data.stats[0].base_stat;
            let pokeType = data.types.map(type => type.type.name).join(', ');
            let pokeWeight = data.weight;
            let pokeHeight = data.height;

            showPokeInfo(pokeImg, pokeName, pokeId, pokeHp, pokeType, pokeWeight, pokeHeight);

        })
        .catch(() => {
            showError();
        });
}

//Funcion para mostrar un mensaje de error

function showPokeInfo(pokeImg, pokeName, pokeId, pokeHp, pokeType, pokeWeight, pokeHeight) {
    let infoContainer = 'pokeInfo';
    let info = document.getElementById(infoContainer);

    // Limpiar clases de tipo anteriores
    let cardTwo = document.querySelector('.card-two');
    cardTwo.classList.remove(...cardTwo.classList);

    // Asignar el nuevo tipo
    let pokeTypes = pokeType.split(', ');
    cardTwo.classList.add('card-two', `type-${pokeTypes[0]}`);

    info.innerHTML = `
        <div class="pk-primaryInfo">
            <h2 class="pk-name">${pokeName.toUpperCase()}</h2>
            <p class="pk-id">#${pokeId}</p>
        </div>
        <img class="pk-img" src="${pokeImg}" alt="${pokeName}"> 
        <div class="pk-secondaryInfo">
            <table class="pk-table">
                <tr>
                    <td><b>hp:</b></td>
                    <td>${pokeHp}</td>
                </tr>
                <tr>
                    <td><b>type:</b></td>
                    <td>${pokeType}</td>
                </tr>
                <tr>
                    <td><b>weight:</b></td>
                    <td>${pokeWeight / 10} kg</td>
                </tr>
                <tr>
                    <td><b>height:</b></td>
                    <td>${pokeHeight / 10} m</td>
                </tr>
            </table>
        </div>

    `;
}


// Funcion mostrar pokemon inicial

window.onload = function() {
    document.getElementById('pokeInput').value = '1';
    searchPoke();
}

// Funcion para mostrar un mensaje de error

function showError() {
    let infoContainer = 'pokeInfo';
    let info = document.getElementById(infoContainer);

    info.innerHTML = `
        <div class="pk-error">
            <p>Pokemon not found <br> Try again.</p>
        </div>
    `;
}