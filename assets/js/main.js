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

let formSubHandle = function (e) {
    e.preventDefault();

    let cityName = cityInput.val();

    if (cityName) {
        getGeoData(cityName);
    }   else  {
        alert('Please enter a city');
    };

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

let getWeatherData = function(location){
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + location[0].lat + '&lon=' + location[0].lon + '&appid=e72f05f482b1c3bc3c0a5a8e46b6c361&units=imperial'

    fetch(weatherUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then (function (data) {
                    console.log(data);
                })
            }
        })
}

citySelection.submit(formSubHandle);