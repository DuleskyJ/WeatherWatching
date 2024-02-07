// MY API KEY that pulls from OpenWeather API: d92491cc84a33db5f345f1a39677bb71


// function getWeather(city) { 
//   var weatherURL='https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=d92491cc84a33db5f345f1a39677bb71&units=imperial' 
//    fetch(weatherURL)
//    .then(function(response){
//        return response.json();
//    }) 
//    .then((data) => console.log(data))
// }

citySubmit.addEventListener("click", function() {
    findCity.value; 
    console.log(findCity.value);
    
})



var findCity = document.querySelector("#findCity");
var currentWeather = document.querySelector("#currentWeather");
var cityList = {};
var citySubmit = document.querySelector("#citySubmit")


