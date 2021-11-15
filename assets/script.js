var citySearchForm = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#cityname")
var fiveDayContainerEl = document.querySelector('#forecast-container');
var citySearchTerm = document.querySelector('#city-search-term');

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
    var apiURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e54e81ac9ec17907a9fb6e5fa99ae12e"
    // Where is this value coming from?
    // TODO: Write your answer here
    var queryString = document.location.search;
    var cityName = queryString.split('=')[1];
  
    if (cityName) {
      citySearchTerm.textContent = cityName;
  
      console.log(cityName);
    } else {
      // Under what condition will this run?
      // TODO: Write your answer here
      document.location.replace('./index.html');
    }
  };

/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
*/

/*
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    current.temp
    current.humidity
    current.uvi
    current.wind_speed
    current.weather.icon
    current.weather
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