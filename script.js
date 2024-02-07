// MY API KEY that pulls from OpenWeather API: d92491cc84a33db5f345f1a39677bb71


// function getWeather(city) { 
//   var weatherURL='https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=d92491cc84a33db5f345f1a39677bb71&units=imperial' 
//    fetch(weatherURL)
//    .then(function(response){
//        return response.json();
//    }) 
//    .then((data) => console.log(data))
// }




var findCity = document.querySelector("#findCity");
var currentWeather = document.querySelector("#currentWeather");
var cityList = {};
var citySubmit = document.querySelector("#citySubmit")

citySubmit.addEventListener("click", function() {
    findCity.value; 
    console.log(findCity.value);
    
})

$('#generatedCities').click(function(){
    event.preventDefault();
    var city = event.target.textContent;
    geoCode(city); })

function currentWeather(lat, lon) {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +'&lon='+ lon +'&appid=d92491cc84a33db5f345f1a39677bb71'
    fetch(requestURL)
    .then(function(response) {
        return response.json(); 
    }}
    .then(function(data){
        var tempDate = data.list[counter].dt_txt.slice('',10);
        var year = tempDate.substr(0, 4);
        var month = tempDate.substr(5,2);
        var day = tempDate.substr(8, 2);
        var date = month +"/"+ day + "/" + year;
        console.log(data);
currentWeather.children[1].textContent="Temp: "+data.main.temp+" °F";
currentWeather.children[2].textContent="Wind: "+data.main.speed+" mph";
currentWeather.children[3].textContent="Humidity: "+data.main.humidity+" %";   
$('#currentDay').text 
})


var counter = 0;
