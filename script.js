function getWeather(city) { 
    var weatherURL='https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=d92491cc84a33db5f345f1a39677bb71&units=imperial' 
    fetch(weatherURL)
    .then(function(response){
        return response.json();
    }) 
    .then((data) => console.log(data))
}
getWeather("New York");


