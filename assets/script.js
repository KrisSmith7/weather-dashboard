var citySearchForm = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#cityname")
var fiveDayContainerEl = document.querySelector('#forecast-container');
var citySearchTerm = document.querySelector('#city-search-term');
var weatherContainer = document.querySelector("#weather-container")
var weatherList = document.querySelector("#weather-list")

var formSubmitHandler = function (event) {
    event.preventDefault();
    
    var cityname = cityInputEl.value.trim();
    
    if (cityname) {
        getCityWeather(cityname);
        
        fiveDayContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city to search.');
    }
};


var getCityWeather = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e54e81ac9ec17907a9fb6e5fa99ae12e"

    fetch(apiURL)
        .then(function(response) {
           // console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // IF YOU NEED data to make a second API call 
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            var coordURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=e54e81ac9ec17907a9fb6e5fa99ae12e"
           console.log(coordURL)
            fetch(coordURL)
            .then(function(bResponse) {
                // console.log(response);
                 return bResponse.json();
             })
             .then(function(bData) {
                 console.log(bData);})
            
            displayWeather(data);
      
        })
        .catch(function(error) {
            console.log(error);
            // alert("Unable to retrieve data.");
        }); 
  };

  
 
 
  /*
  WHEN I view current weather conditions for that city
  THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  */
var displayWeather = function(data, bData) {

    //how can I display this data on screen
    var cName = data.name;
    var weatherIcon = data.weather[0].icon;
    var temperature = data.main.temp;
    var humidity = data.main.humidity;
    var uvIndex = bData.current.uvi;
    var windSpeed = data.wind.speed;
    var cWeather = data.weather[0];
  

      citySearchTerm.textContent = cName;
console.log(uvIndex)
    
    // temperature,windSpeed, humidity);

      for (var i = 0; i<5; i++) {
        var weatherEl = document.createElement('li');
        weatherEl.innerText = "Temp: " + temperature
        // weatherEl.innerText = "Humidity:" + humidity;
        weatherList.appendChild(weatherEl);}

  }


/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
*/


/*
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
*/

/*
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
*/

/*
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/

citySearchForm.addEventListener('submit', formSubmitHandler);