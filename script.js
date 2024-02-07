// MY API KEY that pulls from OpenWeather API: d92491cc84a33db5f345f1a39677bb71


// function getWeather(city) { 
    //   var weatherURL='https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=d92491cc84a33db5f345f1a39677bb71&units=imperial' 
    //    fetch(weatherURL)
    //    .then(function(response){
//        return response.json();
//    }) 
//    .then((data) => console.log(data))
// }
// Define the API URL

var userInput = document.querySelector("#userInput");
var currentWeather = document.querySelector("#currentWeather");
var cityList = {};
var citySubmit = document.querySelector("#citySubmit")
citySubmit.addEventListener("click", function() {
    userInput.value; 
    geoCode(userInput.value);
})

$('#generatedCities').click(function(){
    event.preventDefault();
    var city = event.target.textContent;
    geoCode(city); })

function geoCode(city) {
    var requestURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid=d92491cc84a33db5f345f1a39677bb71"
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        var lat = data[0].lat;
        var lon = data[0].lon;
        currentWeather.children[0].textContent=data[0].name;
        currentWeather(lat, lon);
        FiveDayForecast(lat, lon);
        cityList[data[0].name]=data[0].name;
        localStorage.setItem('searchHistory', JSON.stringify(cityList));
    })
}

function currentWeather(lat, lon) {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +'&lon='+ lon +'&appid=d92491cc84a33db5f345f1a39677bb71'
    fetch(requestURL)
    .then(function(response) {
        return response.json(); 
    })
    .then(function(data){
        currentWeather.children[3].textContent="Temp: "+data.main.temp+" °F";
        currentWeather.children[4].textContent="Wind: "+data.main.speed+" mph";
        currentWeather.children[5].textContent="Humidity: "+data.main.humidity+" %";   
        $('#currentWeather').text(dayjs().format('MM//DD/YYYY'));
        $('#weatherIcon').attr('src', "http://openweathermap.org/img/w/"+data.weather[0].icon+".png");
    })
}

function FiveDayForecast (lat, lon) {
    var requestURL= "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +'&lon='+ lon +'&appid=d92491cc84a33db5f345f1a39677bb71'
    fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var counter = 0;
        $('#forecastCards').children('div').each(function(){
            var tempDate = data.list[counter].dt_txt.slice('',10);
            var year = tempDate.substr(0, 4);
            var month = tempDate.substr(5,2);
            var day = tempDate.substr(8, 2);
            var date = month +"/"+ day + "/" + year;
            $(this).children('h4').text(date);
            $(this).children('img').attr('src', "http://openweathermap.org/img/w/"+data.list[counter].weather[0].icon+".png");
            $(this).children().children('.temp').text(data.list[counter].main.temp);
            $(this).children().children('.wind').text(data.list[counter].main.wind.speed);
            $(this).children().children('.humidity').text(data.list[counter].main.humidity);
            counter += 8
        })
    })
}
   
function makeButtons(){
    var searchHistory = $('#generatedCities');
    cityList= JSON.parse(localStorage.getItem('searchHistory'));
    searchHistory.html('');
    for (var key in cityList){
        var button = document.createElement('button');
        searchHistory.append(button);
        button.textContent = cityList(key);
    }
}

makeButtons();

