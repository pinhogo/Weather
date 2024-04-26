const api = {
    key: "9bb807f8e0ef4dc7a1aca1f94389548b",
    Weather: "https://api.weatherbit.io/v2.0/forecast/daily?",
    Coordinates: "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=",
    Time: "http://api.timezonedb.com/v2.1/get-time-zone?key=TX8A38XHYWK0&format=json&by=position",
    lang: "lang=pt",
    units: "metric",
}


const Rcidade = document.querySelector('.city');
const TempAtual = document.querySelector('#tempatual');
const search = document.querySelector('#search-button');
const locate = document.querySelector('#locate');	
const input = document.querySelector('#search-input');
const windforce = document.querySelector('.windforce');
const moisture = document.querySelector('.moisture');
const probrain = document.querySelector('.probrain'); 
const situation = document.querySelector('.situation');
const hour = document.querySelector('.hour');
const description = document.querySelector('.description')

const minima = document.querySelector('.tempMin');
const maxima = document.querySelector('.tempMax')
const pwindforce = document.querySelector('.pwindforce');
const pmoisture = document.querySelector('.pmoisture');
const pprobrain = document.querySelector('.pprobrain');
const previewIcons = document.querySelector('.previewIcons');


const seg = document.querySelector('.day1');
const ter = document.querySelector('.day2');
const qua = document.querySelector('.day3');
const qui = document.querySelector('.day4');
const sex = document.querySelector('.day5');
const sab = document.querySelector('.day6');
const dom = document.querySelector('.day0');


let lat;
let lon;



window.addEventListener('load', function() {
    searchTemp(-30.1432,-51.2032)
    searchDate(-30.1432,-51.2032)
})


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
    fetch(`${api.Weather}${api.lang}&lat=${lat}&lon=${lon}&key=${api.key}&days=8`)
    
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            //TempAtual.innerHTML = `${Math.round(data.data[0].temp)}`;
            
            display(data)
            pPreview(data)
            

        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
        });
}

function display(data) {

    TempAtual.innerHTML = data.data[0].temp
    windforce.innerHTML = `${data.data[0].wind_spd} m/s`; 
    moisture.innerHTML = `${data.data[0].rh} %`; 
    probrain.innerHTML = `${Math.round(data.data[0].precip)} mm/h`; 
    let iconName = data.data[0].weather.icon;
    
    situation.innerHTML = `<img src='./img/icons/${iconName}.png' alt=''>`; 

    description.innerHTML = data.data[0].weather.description;

}

function pPreview(infos){

   

    minima.textContent = `${Math.round(infos.data[1].app_min_temp)} °C`;
    maxima.textContent = `${Math.round(infos.data[1].app_max_temp)} °C`;
    pwindforce.innerHTML = `${Math.round(infos.data[1].wind_spd)} m/s`;  
    pmoisture.innerHTML = `${Math.round(infos.data[1].rh)} %`; 
    pprobrain.innerHTML = `${Math.round(infos.data[1].precip)} mm/h`; 
    let iconName = infos.data[1].weather.icon;
    previewIcons.innerHTML = `<img src='./img/icons/${iconName}.png' alt=''>`;

    AttPreview(infos, 1)
    NextDay(infos)

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


function NextDay(infos) {

  const data = new Date();

  var proxDay = (data.getDay() + 1) % 7; 
  var second = (data.getDay() + 2) % 7; 
  var third = (data.getDay() + 3) % 7; 
  var four = (data.getDay() + 4) % 7; 
  var five = (data.getDay() + 5) % 7; 
  var six = (data.getDay() + 6) % 7; 
  var seven = (data.getDay() + 7) % 7;


  var dayElement = document.querySelector('.proxDays .day' + proxDay);
    dayElement.classList.add('clicked');


 
 var secondDay = document.querySelector('.proxDays .day' + second);
 secondDay.addEventListener('click', function() {
    AttPreview(infos, second)
})

var thirdDay = document.querySelector('.proxDays .day' + third);
thirdDay.addEventListener('click', function() {
   AttPreview(infos, third)
})

var fourDay = document.querySelector('.proxDays .day' + four);
fourDay.addEventListener('click', function() {
   AttPreview(infos, four)    
})

var fiveDay = document.querySelector('.proxDays .day' + five);
fiveDay.addEventListener('click', function() {
   AttPreview(infos, five)    
})

var sixDay = document.querySelector('.proxDays .day' + six);
sixDay.addEventListener('click', function() {
   AttPreview(infos, six)    
})

var sevenDay = document.querySelector('.proxDays .day' + seven);
sevenDay.addEventListener('click', function() {
   AttPreview(infos, seven)    
})

}

function AttPreview(infos, index){

    minima.textContent = `${Math.round(infos.data[index].app_min_temp)} °C`;
    maxima.textContent = `${Math.round(infos.data[index].app_max_temp)} °C`;
    pwindforce.innerHTML = `${Math.round(infos.data[index].wind_spd)} m/s`;  
    pmoisture.innerHTML = `${Math.round(infos.data[index].rh)} %`; 
    pprobrain.innerHTML = `${Math.round(infos.data[index].precip)} mm/h`; 
    let iconName = infos.data[index].weather.icon;
    previewIcons.innerHTML = `<img src='./img/icons/${iconName}.png' alt=''>`;

}