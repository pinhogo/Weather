const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric",
    busca: "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=",
}


const searchButton = document.querySelector('#search-button');
const results = document.querySelector(".city");
let cidade;
let latitude;
let longitude;


searchButton.addEventListener('click', function() {
    // Seleciona o campo de busca
    const inputCidade = document.querySelector('#search-input');
    // Obtém o valor digitado no campo de busca
    const valorDigitado = inputCidade.value;
    cidade = inputCidade.value;
    
    // Agora você pode usar o valorDigitado como desejar, por exemplo, exibindo-o no console
    console.log('Valor digitado:', valorDigitado);

    fetch(api.busca+cidade)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        data.forEach(obj => {
             latitude = obj.lat;
             longitude = obj.lon;
             cidade = obj.name;
             results.textContent = cidade;

        
             

             console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        });
    })
    .catch(error => {
        console.error('Erro ao obter dados da API:', error);

        
    });


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