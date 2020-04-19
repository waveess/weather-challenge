// getting the main elements by their class and id

var searchBtnEl = document.querySelector(".btn");
var weatherInfoEl = document.querySelector(".weather-info");
var searchHistoryEl = document.querySelector(".search-history");

//getting the weather info from the API

var getWeatherInfo = function () {
    //empty the weather information each time
    weatherInfoEl.textContent = "";

    var searchInput = document.getElementById("weather-search").value.trim();
    var apiKey = "50acd4750672f8d8312ca76eb0b1f129";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=" + apiKey;
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + searchInput + "&units=imperial&appid=" + apiKey;

    console.log(searchInput);

    //make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(response){
            currentWeatherCondidtion(response);
        });
    });

    //make a request to the forecast url
    fetch(forecastUrl).then(function(response){
        response.json().then(function(response){
            console.log(response);
        });
    });

}

// $('div').on("click", ".card", function(event) {
//         event.stopPropagation();
//         weatherInfoEl.empty();
//         var historyInput = $(this)[0].innerHTML;
//         console.log(historyInput);
// })


//display the current weather
var currentWeatherCondidtion = function(response) {
    var value = response.dt;
    var currentDay = moment.unix(response.dt).format("MM/DD/YYYY");

    var cityName = document.createElement("h3");
    cityName.textContent = response.name + " " + currentDay 

    //create the temperature element
    var temperatureEl = document.createElement("div");
    temperatureEl.classList = "temperature";
    var pEl = document.createElement("p");
    pEl.textContent = "Temperature: " + response.main.temp + "°C";
    temperatureEl.appendChild(pEl);

    //create the humidty Element
    var humidityEl = document.createElement("div");
    humidityEl.classList = "humidty";
    var pHEl = document.createElement("p");
    pHEl.textContent = "Humidity: " + response.main.humidity + "%";
    humidityEl.appendChild(pHEl);

    //create the wind element
    var windSpeedEl = document.createElement("div");
    windSpeedEl.classList = "wind";
    var pWsEl = document.createElement("p");
    pWsEl.textContent = "Wind Speed: " + response.wind.speed + "MPH";
    windSpeedEl.appendChild(pWsEl);

    //create the City Name Element
    var cityNameEl = document.createElement("div");
    cityNameEl.classList = "title";

    //Get the Weather Icon
    var weatherIcon = response.weather[0].icon;
    var weatherImgEl = document.createElement("img");
    weatherImgEl.setAttribute("src" , "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
    weatherImgEl.classList = "weatherIcon";

    //append Element
    cityName.appendChild(weatherImgEl);
    cityNameEl.appendChild(cityName);
    weatherInfoEl.appendChild(cityNameEl);
    weatherInfoEl.appendChild(temperatureEl);
    weatherInfoEl.appendChild(humidityEl);
    weatherInfoEl.appendChild(windSpeedEl);

}


searchBtnEl.addEventListener("click", getWeatherInfo);