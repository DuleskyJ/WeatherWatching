// MY API KEY that pulls from OpenWeather API: d92491cc84a33db5f345f1a39677bb71

// global variables I'll be using for my functions 
var userInput = document.querySelector("#userInput");
var currentWeather = $("#currentWeather");
var cityList = {};
var citySubmit = document.querySelector("#citySubmit")
citySubmit.addEventListener("click", function() {
    userInput.value; 
    geoCode(userInput.value);
})

// Clearing previous city's weather when searching
$('#generatedCities').click(function(){
    event.preventDefault();
    var city = event.target.textContent;
    geoCode(city);
 })

// fetching API geocode to gather coordinates of a city given then creating variables with the data so all site information updates properly
function geoCode(city) {
    var requestURL = "https://api.openweathermap.org/geo/1.0/direct?q="+ city +"&appid=d92491cc84a33db5f345f1a39677bb71"
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        mainWeather(lat, lon);
        FiveDayForecast(lat, lon);
        cityList[data[0].name]=data[0].name;
        localStorage.setItem('searchHistory', JSON.stringify(cityList));
        console.log(cityList)
    })
}

// fetching API to gather a city's weather information and converting what's gathered into readable HTML
function mainWeather(lat, lon) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +'&lon='+ lon +'&appid=d92491cc84a33db5f345f1a39677bb71&units=imperial'
    fetch(requestURL)
    .then(function(response) {
        return response.json(); 
    })
    .then(function(data){
        console.log(data);
        $('#mainTemp').text("Temp:"+data.main.temp+ "°F");
        $('#mainWind').text("Wind:"+data.wind.speed+ "mph");
        $('#mainHumidity').text("Humidity:"+data.main.humidity+ "%");
        $('#currentWeather').text(dayjs().format('MM/DD/YYYY'));
        $('#weatherIcon').attr('src', "http://openweathermap.org/img/w/"+data.weather[0].icon+".png");
    })
}

// fetching the forecast API so I can use it to gather and pair information to fill my 5 day forecast cards with data
function FiveDayForecast (lat, lon) {
    var requestURL= "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +'&lon='+ lon +'&appid=d92491cc84a33db5f345f1a39677bb71&units=imperial'
    fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var counter = 0;
        $('#weekForecast').children('div').each(function(){
            var tempDate = data.list[counter].dt_txt.slice('',10);
            var year = tempDate.substr(0, 4);
            var month = tempDate.substr(5,2);
            var day = tempDate.substr(8, 2);
            var date = month +"/"+ day + "/" + year;
            $(this).children('h4').text(date);
            $(this).children('img').attr('src', "http://openweathermap.org/img/w/"+data.list[counter].weather[0].icon+".png");
            $(this).children().children('.temp').text(data.list[counter].main.temp);
            $(this).children().children('.wind').text(data.list[counter].wind.speed);
            $(this).children().children('.humidity').text(data.list[counter].main.humidity);
            counter += 8
        })
    })
}
   
// Function in progress... Trying to create and save buttons after searching for cities
// Working on it with group & instructors 

 // function makeButtons(){
 //  var searchHistory = $('#generatedCities');
 //  cityList= JSON.parse(localStorage.getItem('searchHistory'));
 //   searchHistory.html('');
 //   for (var key in cityList){
 //       var button = document.createElement('button');
 //       searchHistory.append(button);
 //       button.textContent = cityList(key);
 //    }
 // }

 // makeButtons();

