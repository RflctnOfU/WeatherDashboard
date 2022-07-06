// geocoding api call -- http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// one call api call -- https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// let formEl = $('#citySelection');

// let search = $('.btn');



// let weatherUrl = weather + lat + lon + key

// let geocodingSearch = 'http://api.openweathermap.org/geo/1.0/direct?q=tampa,fl,us&limit=5&appid=e72f05f482b1c3bc3c0a5a8e46b6c361'

// function getWeatherData() {

//     let key = "&appid=e72f05f482b1c3bc3c0a5a8e46b6c361&units=imperial";

//     let forecast = "https://api.openweathermap.org/data/2.5/forecast?q="

//     let weather = "https://api.openweathermap.org/data/2.5/weather?q="

//     let geo = 'http://api.openweathermap.org/geo/1.0/direct?q='

//     let city;

//     search.click(function (){
//         weather += city;
//         weather += key;
//     })       

//     fetch(geo, {
//     })
//     .then(function (response){
//         return response.json()
//     })
//     .then(function (data){
//         console.log('here we go again');


//         console.log(data[0].lat);
//         console.log(data[0].lon);
//         // lat += data[0].lat;
//         // lon += data[0].lon;
//         // weather += lat;
//         // weather += lon;
//         // weather += key;
//     });
//     fetch(forecast)
//     .then (function (response){
//         return response.json()
//     })
//     .then (function(data){
//         console.log(data);
//     })
// };



// getWeatherData();


// City (date) \n temp: \n wind: \n Humidity: \n UV index:

// 5-day Forecast:

let citySelection = $('#citySelection');

let cityInput = $('#city');

let searchHistory = $('#past-searches');

let searchBtn = $('.searchBtn')

let currentWeather = $('#currentWeather');

let cardBox = $('#cardBox');

let dailyForecast = $('.dailyForecast');

let historyArr = [];

let formSubHandle = function (e) {
    e.preventDefault();

    let cityName = cityInput.val();

    if (cityName) {
        getGeoData(cityName);
    } else {
        alert('Please enter a city');
    };

    historyArr.push(cityName);

    localStorage.setItem('cities', historyArr);

    let historyButton = document.createElement('button');
    historyButton.setAttribute('class', 'btn btn-secondary mb-2 searchBtn'); historyButton.setAttribute('style', 'width: 100%; margin: 5px 0 5px 0;'); historyButton.setAttribute('type', 'button'); historyButton.setAttribute('name', cityName);
    historyButton.textContent = cityName;
    searchHistory.append(historyButton);


    // localStorage.setItem()
};

let getGeoData = function (city) {
    let geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=e72f05f482b1c3bc3c0a5a8e46b6c361';

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

let displayWeather = function (weather) {
    cardBox.empty();
    dailyForecast.empty();
    currentWeather.empty();
    let searchCity = cityInput.val().toUpperCase();
    let weatherIcon = document.createElement('img')
    weatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.current.weather[0].icon + '.png');
    weatherIcon.setAttribute('width', '40');
    let heading = document.createElement('h3');
    heading.textContent = searchCity + ': ' + moment().format('l');
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
    // console.log(moment.unix(unix).format('l'));
    // console.log(unix);
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
        dayIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + dayIconVal + '.png');
        dayIcon.setAttribute('width', '40');
        dayTemp.textContent = 'Temp: ' + dayTempVal + '℉'
        dayWind.textContent = 'Wind: ' + dayWindVal + 'mph'
        dayHumidity.textContent = 'Humidity: ' + dayHumidityVal + '%'

        cardBox.append(dayCard);
        dayCard.append(dayDate, dayIcon, dayTemp, dayWind, dayHumidity);
    }

}

// let historyBtn = function () {
//     console.log('hello');
// }

citySelection.submit(formSubHandle);
searchHistory.on('click', searchBtn, function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    let searchCity = this.attr('name');
    console.log(searchCity);
    // if (searchCity) {
    //     getGeoData(searchCity);
    // }
})