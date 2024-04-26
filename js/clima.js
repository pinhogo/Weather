const api = {
    key: "9bb807f8e0ef4dc7a1aca1f94389548b",
    Weather: "https://api.weatherbit.io/v2.0/current?",
    Coordinates: "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=",
    Time: "http://api.timezonedb.com/v2.1/get-time-zone?key=TX8A38XHYWK0&format=json&by=position",
    lang: "&lang=pt",
    units: "metric",
}


const Rcidade = document.querySelector('.city');
const TempAtual = document.querySelector('#tempatual');
const search = document.querySelector('#search-button');	
const input = document.querySelector('#search-input');
const windforce = document.querySelector('.windforce');
const moisture = document.querySelector('.moisture');
const probrain = document.querySelector('.probrain'); 
const situation = document.querySelector('.situation');
const hour = document.querySelector('.hour');

let lat;
let lon;

search.addEventListener('click', function() {
    searchCords(input.value)
})

input.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchCords(input.value)
    }
}


function searchCords(cidade) 
{
    fetch(api.Coordinates + cidade)
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
                let cidade = obj.name;
                Rcidade.textContent = cidade;

                lat = latitude.slice(0, -3);
                lon = longitude.slice(0, -3);

                console.log(`Cidade: ${cidade}, Latitude: ${lat}, Longitude: ${lon}`);
                
                searchTemp(lat, lon)
                searchDate(lat, lon)

            });
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);


        });
}

function searchDate(lat, lon) {
    fetch(`${api.Time}&lat=${lat}&lng=${lon}`)
    
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            let tempo = data.formatted
            tempo = tempo.split(' ')
            hour.innerHTML = tempo[1].slice(0, -3)
            

            

        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
        });
}




function searchTemp(lat, lon) {
    fetch(`${api.Weather}lat=${lat}&lon=${lon}${api.lang}&key=${api.key}`)
    
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //TempAtual.innerHTML = `${Math.round(data.data[0].temp)}`;
            
            display(data)

        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
        });
}

function display(data) {

    TempAtual.innerHTML = data.data[0].temp
    windforce.innerHTML = `${data.data[0].wind_spd} m/s`; 
    moisture.innerHTML = `${data.data[0].rh} %`; 
    probrain.innerHTML = `${data.data[0].precip} mm/h`; 
    let iconName = data.data[0].weather.icon;
    console.log(iconName)
    situation.innerHTML = `<img src='./img/icons/${iconName}.png' alt=''>`;    
}


function toggleBackground(event, element) {
  
    
    var links = document.querySelectorAll('.proxDays div'); // Selecionar todos os links
  
    // Remover a classe "clicked" de todos os elementos
    links.forEach(function(link) {
      link.classList.remove('clicked');
    });
    
    // Adicionar a classe "clicked" apenas ao elemento clicado
    element.classList.add('clicked');
    
  }
  function DataAtual() {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const dias = [
        "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
        "Quinta-feira", "Sexta-feira", "Sábado"
    ];

    const dataAtual = new Date();
      //dataAtual.setDate(dataAtual.getDate() + 1);
      NextDay(dataAtual)
    const dia = dataAtual.getDate();
    const diaSemana = dias[dataAtual.getDay()];
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();

    let proxDay = `${dia}${mes}${ano}`
    let day = `${diaSemana}, ${dia} de ${mes} de ${ano}`;

    // Atualize o conteúdo do elemento com ID "atualday" com a data atual
    document.getElementById("atualday").textContent = day;
}

document.addEventListener('DOMContentLoaded', function() {
  DataAtual();
}); //colocar dps a funcaoi de puxar a geolocalizacao

function NextDay(data) {

  var proxDay = data.getDay() + 1; 
  
  var dayElement = document.querySelector('.proxDays .day' + proxDay);

    dayElement.classList.add('clicked');

  var third = document.querySelector('.proxDays .day' + proxDay+1);
  var four = document.querySelector('.proxDays .day' + third+1);
  var fif = document.querySelector('.proxDays .day' + four+1);
  var six = document.querySelector('.proxDays .day' + fif+1);
  var seven = document.querySelector('.proxDays .day' + six+1);

  
}




