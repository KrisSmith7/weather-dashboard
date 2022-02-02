var citySearchForm = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#cityname")
var fiveDayContainerEl = document.querySelector('#forecast-container');
var cityName= document.querySelector('#city-search-term');
var weatherContainer = document.querySelector("#weather-container")
var weatherList = document.querySelector("#weather-list")

var currentName = document.querySelector('#current-city-name');
var currentDate = document.querySelector('#current-date');
var currentWind = document.querySelector('#current-city-wind');
var currentHumidity = document.querySelector('#current-city-humidity');
var currentTemp = document.querySelector('#current-city-temp');
var currentUV = document.querySelector('#current-city-uv');
var uvContainer = document.querySelector('#current-index');
var currentIcon = document.querySelector('#current-wIcon');
const APIkey = 'b95de3ec77908dd1b6d987025a729e40'

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let today = weekday[d.getDay()];


var prevSearchContainer = document.querySelector('#prev-searches')
var searchedCities = JSON.parse(localStorage.getItem("SearchedCities")) || []; // key: SearchedCities: "["{"austin"}"]"


var formSubmitHandler = function (event) {
    event.preventDefault();
    
    const cityname = cityInputEl.value.trim();
    
    if (cityname) {
        getCityWeather(cityname);
        
        cityName.textContent = cityname;
        currentName.textContent = cityname;

        cityInputEl.value = '';
        searchedCities.push(cityname);
        saveCitySearch();
        displaySearchHistory()
    } else {
        alert('Please enter a city to search.');
    }
};

var saveCitySearch = function() {
    localStorage.setItem("SearchedCities", JSON.stringify(searchedCities));
};

var displaySearchHistory = function() {
    let currentCities = JSON.parse(localStorage.getItem("SearchedCities"));
    // console.log (currentCities);
      

    //create button for each city searched
    for (var i = 0; i < currentCities.length; i++) {
        var newButton = document.createElement("button");
        newButton.textContent = currentCities[i];
        newButton.classList = "btn btn-secondary btn-lg my-2 p-2 w-100";
        // cityEl.setAttribute("data-city", cities[i]);
        prevSearchContainer.appendChild(newButton);
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

    //displays weather conditions on screen
    var currentIconNumber = data.current.weather[0].icon;
    currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIconNumber + "@2x.png");
   
    currentDate.textContent = today;
    currentTemp.textContent = "Temp: " + data.current.temp + " F";
    currentHumidity.textContent =  "Humidity: " + data.current.humidity + "%";
    currentWind.textContent = "Wind Speed: " + data.current.wind_speed + " MPH";
    currentUV.textContent = "UV Index: " + data.current.uvi;

    
    // conditional logic for that presents a color that indicates whether the UV index conditions are favorable, moderate, or severe
    if (data.current.uvi <= 2.99) {
        uvContainer.setAttribute("class", "rounded-md bg-green-900 text-green-50 font-bold p-2");
        uvContainer.innerText = "Favorable"
    }
    if (data.current.uvi >= 3 && data.current.uvi <= 6){
        uvContainer.setAttribute("class", "rounded-md bg-yellow-700 text-yellow-50 font-bold p-2");
        uvContainer.innerText = "Moderate"
    }
    if (data.current.uvi >=6.01){
        uvContainer.setAttribute("class", "rounded-md bg-red-900 text-red-50 font-bold p-2");
        uvContainer.innerText = "Severe"
    }

    fiveDayContainerEl.innerHTML = ""

    for (var i = 0; i < 5; i++){
        
        let curr = new Date 
    let week = []
    
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }
    console.log(week);
   
        
    // let day = weekday[d.getDay()];
    // console.log(d)

      var cardContainer = document.createElement("div");
      cardContainer.setAttribute("class", "px-8")
      var cardBody = document.createElement("div");
      cardBody.setAttribute("class", "bg-gray-500 text-white border-2 rounded-md p-3");
  
      var cityDate = document.createElement("div");
      cityDate.textContent =  week[i]
    //   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    //   const d = new Date();
    
  
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
      fiveDayContainerEl.append(cardContainer);
    }
  }




/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
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