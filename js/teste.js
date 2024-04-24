const api = {
    key: "4028abbee30b3f9908233d0a6e4c217a",
    base: "https://api.openweathermap.org/data/3.0/",
    lang: "pt_br",
    units: "metric"
    findlocate: "http://api.openweathermap.org/geo/1.0/direct?q="
}

const city = document.querySelector('.city')
/**const date = document.querySelector('.date');*/
const container_img = document.querySelector('.situation');
const container_temp = document.querySelector('.leftbanner');
const temp_number = document.querySelector('#tempatual');
const temp_unit = document.querySelector('.leftbanner span');
/**const weather_t = document.querySelector('.weather');                    **CRIAR*/
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');
/**const low_high = document.querySelector('.low-high');                 ???? */

/**window.addEventListener('load', () => {
    //if ("geolocation" in navigator)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert('navegador não suporta geolozalicação');
    }
    function setPosition(position) {
        console.log(position)
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        coordResults(lat, long);
    }
    function showError(error) {
        alert(`erro: ${error.message}`);
    }
})

function coordResults(lat, long) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
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
            displayResults(response)
        });
} */

search_button.addEventListener('click', function() {
    searchResults(search_input.value)
})

search_input.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search_input.value)
    }
}
function searchResults(city) {
    fetch(`${api.findlocate}${city}&limit=1&appid=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message);
        })
        .then(response => {
            // Verifica se há resultados na resposta antes de chamar displayResults
            if (response && response.length > 0) {
                const lat = response[0].lat;
                const lon = response[0].lon;
                displayResults(lat, lon);
            } else {
                // Caso contrário, exibe uma mensagem de erro
                alert("Nenhum resultado encontrado para a cidade.");
            }
        });

}

/**function searchResults(city) {
    fetch(`${api.findlocate}${city}&limit=1&appid=${api.key}`)
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
            displayResults(response)
        });
}**/

function displayResults(lat, lon) {
    console.log(lat, lon)

    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    date.innerText = dateBuilder(now);

    let iconName = weather.weather[0].icon;
    container_img.innerHTML = `<img src="./icons/${iconName}.png">`;

    let temperature = `${Math.round(weather.main.temp)}`
    temp_number.innerHTML = temperature;
    temp_unit.innerHTML = `°c`;

    weather_tempo = weather.weather[0].description;
    weather_t.innerText = capitalizeFirstLetter(weather_tempo)

    low_high.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}



container_temp.addEventListener('click', changeTemp)
function changeTemp() {
    temp_number_now = temp_number.innerHTML

    if (temp_unit.innerHTML === "°c") {
        let f = (temp_number_now * 1.8) + 32
        temp_unit.innerHTML = "°f"
        temp_number.innerHTML = Math.round(f)
    }
    else {
        let c = (temp_number_now - 32) / 1.8
        temp_unit.innerHTML = "°c"
        temp_number.innerHTML = Math.round(c)
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}