const api = {
    key: "9bb807f8e0ef4dc7a1aca1f94389548b",
    base: "https://api.openweathermap.org/data/3.0/onecall?",
    lang: "pt",
    units: "metric",
    busca: "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=",
}

const searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', function () {

    const results = document.querySelector(".city");
    const TempAtual = document.querySelector("#tempatual");

    let cidade;
    let lat;
    let lon;



    // Seleciona o campo de busca
    const inputCidade = document.querySelector('#search-input');
    // Obtém o valor digitado no campo de busca
    const valorDigitado = inputCidade.value;
    cidade = inputCidade.value;

    // Agora você pode usar o valorDigitado como desejar, por exemplo, exibindo-o no console
    console.log('Valor digitado:', valorDigitado);

    fetch(api.busca + cidade)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(obj => {

                let latitude = obj.lat;
                let longitude = obj.lon;
                cidade = obj.name;
                results.textContent = cidade;

                lat = latitude.slice(0, -3);
                lon = longitude.slice(0, -3);



                console.log(`Cidade: ${cidade}, Latitude: ${lat}, Longitude: ${lon}`);

            });
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);


        });


    //fetch(`${api.base}lat=${lat}&lon=${lon}&appid=${api.key}`);
    
    function searchResults(lat, lon) {
        fetch(`${api.base}lat=${lat}&lon=${lon}&appid=${api.key}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`http error: status ${response.status}`)
                }
                return response.json();
            })
            .catch(error => {
                alert(error.message)
            })
            .then(response => {
                dados.forEach
                displayResults(response)
            });
    }

    function displayResults(weather) {

        console.log(`Cidade: ${weather}`);

    }



});







/*searchButton.addEventListener('click', function() {
    // Seleciona o campo de busca
    const inputCidade = document.querySelector('#search-input');
    // Obtém o valor digitado no campo de busca
    cidade = inputCidade.value;
    
    // Limpa os resultados anteriores
    results.innerHTML = '';

    // Verifica se o campo de busca não está vazio
    if (cidade.trim() !== '') {
        // Realiza a busca usando a cidade digitada
        const url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + cidade;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    data.forEach(element => {
                        // Exibe os resultados
                        results.innerHTML += `<div class='result'>${element.display_name}<br>Lat: ${element.lat} Lng: ${element.lon}</div>`;
                    });
                } else {
                    // Exibe uma mensagem se não forem encontrados resultados
                    results.innerHTML = "<p style='color: red;'>Cidade não encontrada</p>";
                }
            })
            .catch(err => console.log(err));
    } else {
        // Exibe uma mensagem se o campo de busca estiver vazio
        results.innerHTML = "<p style='color: red;'>Por favor, digite o nome de uma cidade</p>";
    }
});*/