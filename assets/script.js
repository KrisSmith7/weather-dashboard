var citySearchForm = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#cityname")
var fiveDayContainerEl = document.querySelector('#forecast-container');
var cityName= document.querySelector('#city-search-term');
var weatherContainer = document.querySelector("#weather-container")
var weatherList = document.querySelector("#weather-list")

var currentName = document.querySelector('#current-city-name');
var currentWind = document.querySelector('#current-city-wind');
var currentHumidity = document.querySelector('#current-city-humidity');
var currentTemp = document.querySelector('#current-city-temp');
var currentUV = document.querySelector('#current-city-uv');
var currentIcon = document.querySelector('#current-wIcon');
const APIkey = 'b95de3ec77908dd1b6d987025a729e40'


var formSubmitHandler = function (event) {
    event.preventDefault();
    
    const cityname = cityInputEl.value.trim();
    
    if (cityname) {
        getCityWeather(cityname);
        
        cityName.textContent = cityname;
        currentName.textContent = cityname;

        cityInputEl.value = '';
    } else {
        alert('Please enter a city to search.');
    }
};


var getCityWeather = function (city) {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            // IF YOU NEED data to make a second API call 
            const lon = data.coord.lon;
            const lat = data.coord.lat;
            const coordURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=" + APIkey
           
            fetch(coordURL)
            .then(response => {return response.json()})
            .then(coordinateData => {displayWeather(coordinateData); console.log(coordinateData)})
            .catch(error => {console.log(error);
                    alert("Unable to retrieve data.");
        }); 
  });
}

  
 
 
  /*
  WHEN I view current weather conditions for that city
  THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  */
var displayWeather = function(data) {

    //how can I display this data on screen
    var currentIconNumber = data.current.weather[0].icon;
    currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIconNumber + "@2x.png");
   
    currentTemp.textContent = "Temp: " + data.current.temp + " F";
    currentHumidity.textContent =  "Humidity: " + data.current.humidity + "%";
    currentWind.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
    currentUV.textContent = "UV Index: " + data.current.uvi;


    for (var i = 0; i < 5; i++){
       
      var cardContainer = document.createElement("div");
      var cardBody = document.createElement("div");
      cardBody.setAttribute("class", "bg-dark p-3 border");
  
      var cityDate = document.createElement("div");
      // cityDate.textContent = moment().add((i+ 1), 'day').format("MMM DD YYYY");
     
  
      var weatherImage = document.createElement("img");
      var iconNumber = data.daily[i].weather[0].icon;
      weatherImage.setAttribute("src", "http://openweathermap.org/img/wn/" +iconNumber + "@2x.png");
   
     
      var tempElement = document.createElement("div");
      tempElement.textContent = "Temp: " + data.daily[i].temp.day + "°F"
      
  
      var windSpeed = document.createElement("div");
      windSpeed.textContent = "Wind Speed: " + data.daily[i].wind_speed + "MPH";
  
  
      var humidityF = document.createElement("div");
      humidityF.textContent = "Humidity: " + data.daily[i].humidity + "%";
    
      cardBody.append(cityDate, weatherImage, tempElement, windSpeed, humidityF);
      cardContainer.append(cardBody);
      document.querySelector("#forecast-container").append(cardContainer);
    }
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