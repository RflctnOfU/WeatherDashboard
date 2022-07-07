// global variables 
let citySelection = $('#citySelection');

let cityInput = $('#city');

let searchHistory = $('#past-searches');

let searchBtn = $('.searchBtn')

let currentWeather = $('#currentWeather');

let cardBox = $('#cardBox');

let dailyForecast = $('.dailyForecast');

let historyVal;

let historyArr = [];
// start up function...checks local storage to see if any searches have previously been done, and if so, displays the previous search cities
let init = function () {
    let btnArr = JSON.parse(localStorage.getItem('cities'));
    if (btnArr !== null) {
        for (let i = 0; i < btnArr.length; i++) {
            let historyButton = document.createElement('button');
            historyButton.setAttribute('class', 'btn btn-secondary mb-2 searchBtn'); historyButton.setAttribute('style', 'width: 100%; margin: 5px 0 5px 0;'); historyButton.setAttribute('type', 'button'); historyButton.setAttribute('id', btnArr[i]);
            historyButton.textContent = btnArr[i];
            searchHistory.append(historyButton);
            historyArr = btnArr;
        }
    }
}
// search event handler - begins the fetch process
let formSubHandle = function (e) {
    e.preventDefault();

    let cityName = cityInput.val();

    if (cityName) {
        getGeoData(cityName);
    } else {
        alert('Please enter a city');
    };
    //updating array for local storage
    historyArr.push(cityName);

    localStorage.setItem('cities', JSON.stringify(historyArr));
    // creates buttons for search history
    let historyButton = document.createElement('button');
    historyButton.setAttribute('class', 'btn btn-secondary mb-2 searchBtn'); historyButton.setAttribute('style', 'width: 100%; margin: 5px 0 5px 0;'); historyButton.setAttribute('type', 'button'); historyButton.setAttribute('id', cityName);
    historyButton.textContent = cityName;
    searchHistory.append(historyButton);
    console.log(historyArr);
};
// gets geolocation data to feed latitude and longitude to weather api
let getGeoData = function (city) {
    let geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=e72f05f482b1c3bc3c0a5a8e46b6c361';

    fetch(geoUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    getWeatherData(data);
                });
            }
        })
};
// weather api fetch
let getWeatherData = function (location) {
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + location[0].lat + '&lon=' + location[0].lon + '&appid=e72f05f482b1c3bc3c0a5a8e46b6c361&units=imperial'

    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data);
                })
            }
        })
};
// display the data retrieved from api
let displayWeather = function (weather) {
    cardBox.empty();
    dailyForecast.empty();
    currentWeather.empty();
    let searchCity = cityInput.val().toUpperCase();
    let weatherIcon = document.createElement('img')
    weatherIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '.png');
    weatherIcon.setAttribute('width', '40');
    let heading = document.createElement('h3');
    if (cityInput.value = '') {
        heading.textContent = historyVal + ': ' + moment().format('l');
    } else {
        heading.textContent = searchCity + ': ' + moment().format('l');
    }
    let temp = document.createElement('span');
    temp.textContent = 'Temp: ' + weather.current.temp + '℉';
    let wind = document.createElement('span');
    wind.textContent = 'Wind: ' + weather.current.wind_speed + "mph";
    let humidity = document.createElement('span');
    humidity.textContent = 'Humidity: ' + weather.current.humidity + '%'
    let uv = document.createElement('span');
    let index = document.createElement('span');
    index.textContent = weather.current.uvi
    if (weather.current.uvi <= 2) {
        index.setAttribute('style', 'background-color: green; padding: 0 10px; border-radius: 4px;')
    } else if (3 <= weather.current.uvi <= 5) {
        index.setAttribute('style', 'background-color: yellow; padding: 0 10px; border-radius: 4px;')
    } else if (5 < weather.current.uvi < 8) {
        index.setAttribute('style', 'background-color: orange; padding: 0 10px; border-radius: 4px;')
    } else if (weather.current.uvi <= 10) {
        index.setAttribute('style', 'background-color: red; padding: 0 10px; border-radius: 4px;')
    }
    uv.textContent = "UV Index: ";
    currentWeather.append(heading, weatherIcon);
    heading.append(weatherIcon);
    currentWeather.append(temp);
    currentWeather.append(wind);
    currentWeather.append(humidity);
    currentWeather.append(uv);
    uv.append(index);
    let unix = weather.daily.sunrise;
    let fiveDay = document.createElement('h4');
    fiveDay.setAttribute('class', 'col-12')
    fiveDay.textContent = "5-Day Forecast:"
    cardBox.append(fiveDay);
    for (let i = 1; i < 6; i++) {
        let dayIconVal = weather.daily[i].weather[0].icon
        let unix = weather.daily[i].sunrise;
        let dayTempVal = weather.daily[i].temp.day;
        let dayWindVal = weather.daily[i].wind_speed;
        let dayHumidityVal = weather.daily[i].humidity;
        let dayCard = document.createElement('div');
        dayCard.setAttribute('style', 'height: 175px; width: 150px; border: solid black 1px; border-radius: 5px; background-color: gray; color: white; margin: 20px; display: flex; flex-direction: column; justify-content: space-between; padding: 5px');
        let dayDate = document.createElement('span'); dayDate.setAttribute('style', 'font-weight: bold; font-size: 1.2rem');
        let dayIcon = document.createElement('img');
        let dayTemp = document.createElement('span');
        let dayWind = document.createElement('span');
        let dayHumidity = document.createElement('span');
        dayDate.textContent = moment.unix(unix).format('l');
        dayIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + dayIconVal + '.png');
        dayIcon.setAttribute('width', '40');
        dayTemp.textContent = 'Temp: ' + dayTempVal + '℉'
        dayWind.textContent = 'Wind: ' + dayWindVal + 'mph'
        dayHumidity.textContent = 'Humidity: ' + dayHumidityVal + '%'
        cardBox.append(dayCard);
        dayCard.append(dayDate, dayIcon, dayTemp, dayWind, dayHumidity);
    }
}
//click event for form submission
citySelection.submit(formSubHandle);
//brings previously searched city names back into the fetch process
searchHistory.on('click', searchBtn.self, function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let historyCity = e.target.textContent.toUpperCase();
    historyVal = historyCity;
    if (historyCity) {
        getGeoData(historyCity);
    }
});

init();