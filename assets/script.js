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

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let today = weekday[d.getDay()];


var prevSearchContainer = document.querySelector('#prev-searches')
var searchedCities = JSON.parse(localStorage.getItem("SearchedCities")) || []; // key: SearchedCities: "["{"austin"}"]"


var formSubmitHandler = function (event) {
    event.preventDefault();
    
    const cityname = cityInputEl.value.trim();
    
    if (cityname) {
        getCityWeather(cityname);
    
    //passes current searched city to the display card for current weather and forecast section
    cityName.textContent = cityname;
    currentName.textContent = cityname;
    saveCitySearch(cityname);

        cityInputEl.value = '';
    } else {
        alert('Please enter a city to search.');
    }
};

//city is added to the search history
var saveCitySearch = function(cityname) {
    searchedCities.push(cityname)
    localStorage.setItem("SearchedCities", JSON.stringify(searchedCities));
    displaySearchHistory()
};

var displaySearchHistory = function() {
    prevSearchContainer.innerHTML = ""

    let currentCities = JSON.parse(localStorage.getItem("SearchedCities"));
    console.log (currentCities);
      
    //create button for each city searched
    for (var i = 0; i < currentCities.length; i++) {
        var newButton = document.createElement("button");
        newButton.innerText = currentCities[i];
        newButton.classList = "searched text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700";
        newButton.setAttribute("onclick", "prevSearchWeather()");
        prevSearchContainer.appendChild(newButton);
    }
 };

// WHEN I click on a city in the search history, THEN I am again presented with current and future conditions for that city
 function prevSearchWeather() {
    const prevCity = document.activeElement.innerText;
    cityName.textContent = prevCity;
    currentName.textContent = prevCity;
    getCityWeather(prevCity);
    displayWeather(prevCity)
 }

//fetch call to openweathermap API
var getCityWeather = function (city) {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            //data to make a second API call 
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


// presents the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
var displayWeather = function(data) {

    //displays weather conditions on screen
    var currCard = document.getElementById("current-card");
    currCard.classList.remove("invisible");
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
        let day = weekday[d.getDay() + 1 + i];
        let x = i+1
   
        
        var cardContainer = document.createElement("div");
        cardContainer.setAttribute("class", "w-full lg:w-1/5 flex justify-center lg:px-8")
        var cardBody = document.createElement("div");
        cardBody.setAttribute("class", "w-full flex flex-col justify-center bg-blue-700 text-white border-2 shadow-lg rounded-md p-3");
        
        var cityDate = document.createElement("div");
        cityDate.textContent = day
     
  
      var weatherImage = document.createElement("img");
      var iconNumber = data.daily[x].weather[0].icon;
      weatherImage.setAttribute("src", "http://openweathermap.org/img/wn/" +iconNumber + "@2x.png");
   
     
      var tempElement = document.createElement("div");
      tempElement.textContent = "Temp: " + data.daily[x].temp.day + "°F"
      
  
      var windSpeed = document.createElement("div");
      windSpeed.textContent = "Wind Speed: " + data.daily[x].wind_speed + "MPH";
  
  
      var humidityF = document.createElement("div");
      humidityF.textContent = "Humidity: " + data.daily[x].humidity + "%";
    
      cardBody.append(cityDate, weatherImage, tempElement, windSpeed, humidityF);
      cardContainer.append(cardBody);
      fiveDayContainerEl.append(cardContainer);
    }
  }


function deletePrevSearches() {
    localStorage.clear("SearchedCities");
    searchedCities = [];
    console.log(searchedCities)
    prevSearchContainer.innerHTML = ""
}

citySearchForm.addEventListener('submit', formSubmitHandler);