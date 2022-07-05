// geocoding api call -- http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// one call api call -- https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

let search = $('.btn')



// let weatherUrl = weather + lat + lon + key

let geocodingSearch = 'http://api.openweathermap.org/geo/1.0/direct?q=tampa,fl,us&limit=5&appid=e72f05f482b1c3bc3c0a5a8e46b6c361'

function getGeoData() {
    // let lon = '&lon=';

    // let lat = 'lat=';

    // let key = "&appid=e72f05f482b1c3bc3c0a5a8e46b6c361";

    let weather = "https://api.openweathermap.org/data/2.5/forecast?q=tampa&appid=e72f05f482b1c3bc3c0a5a8e46b6c361&units=imperial"

    fetch(geocodingSearch)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        console.log('here we go again');


        console.log(data[0].lat);
        console.log(data[0].lon);
        // lat += data[0].lat;
        // lon += data[0].lon;
        // weather += lat;
        // weather += lon;
        // weather += key;
    });
    fetch(weather)
    .then (function (response){
        return response.json()
    })
    .then (function(data){
        console.log(data);
    })
};



getGeoData();


// City (date) \n temp: \n wind: \n Humidity: \n UV index:

// 5-day Forecast: