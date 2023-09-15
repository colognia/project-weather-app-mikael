"use strict";

// DOM selectors ------------------------------------------
// const weatherData = document.getElementById('weather-container');
// for initial test


const weatherDescription = document.getElementById("weather-description");

const mainTemperature = document.getElementById("main-temp");
// QUESTION: maintemperature or currenttemperature?

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherIcon = document.getElementById("weather-icon");
// need to define conditions when to use which symbol. See global variables.

const dailyWeathertips = document.getElementById("daily-tips");
// need to define conditions when to use which sentence. See global variables.

// weather forecast values
// each span is a child of a parent with an id, so we can adress it as div#id/span[number of child]
const forecastDay1 = document.getElementById("day-one").children[0];
const forecastTem1 = document.getElementById("day-one").children
[1];
const forecastDay2 = document.getElementById("day-two").children[0];
const forecastTem2 = document.getElementById("day-two").children
[1];
const forecastDay3 = document.getElementById("day-three").children[0];
const forecastTem3 = document.getElementById("day-three").children
[1];
const forecastDay4 = document.getElementById("day-four").children[0];
const forecastTem4 = document.getElementById("day-four").children
[1];
const forecastDay5 = document.getElementById("day-five").children[0];
const forecastTem5 = document.getElementById("day-five").children
[1];

// Global variables ---------------------------------------

// complete link to data: const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=89d1a944a381d671e0d7eca3b8362f21"; 

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "89d1a944a381d671e0d7eca3b8362f21";
const city = "Stockholm,Sweden";

const URL = `${BASE_URL}?q=${city}&units=metric&APPID=${API_KEY}`;

// https://api.openweathermap.org/data/2.5/weather?
// holding the weather data object from openweather.com
let weatherObject;

// holding other data for forecast
let forecastURL = "";
let longitude = "";
let latitude = "";
let forecastObject = "";

const pickWeathersymbol = "/design/design2/icons/noun_Umbrella_2030530.svg";
// need to define conditions when to use which symbol

const pickWeathertip = "Dont´t forget your umbrella. It´s wet in Stockholm today.";
// need to define conditions when to use which sentence.
// Get your sunnies on. Stockholm is looking rather great today.
// Light a fire and get cosy. Stockholm is looking grey today.

let kelvinValue = "";
let celsiusValue = "";

// Functions -------------------------------------------------

const fetchWeather = () => {
    fetch(URL)
        // gets raw data
        .then(response => response.json())
        // convert  Objekt to string
        .then(data => {
            console.log("weather data:");
            console.log(data);
            weatherObject = data;
            // console.log(weatherObject)
            longitude = weatherObject.coord.lon;
            latitude = weatherObject.coord.lat;
            forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
            console.log(forecastURL);
            setTimeout(() => { fetchForecast() }, 200);
        })
    setTimeout(() => { insertWeatherdata() }, 2000);
};

const fetchForecast = () => {
    fetch(forecastURL)
        // gets raw data
        .then(response => response.json())
        // convert  Objekt to string
        .then(data => {
            forecastObject = data;
            console.log("forecast data:");
            console.log(forecastObject);
            // console.log(weatherObject) 
        })
}

// 1.st try to retrieve data from api
// const retrieveWeatherdata = ()=>{
//     setTimeout(() => (weatherData.innerHTML =  `<p>${weatherObject.base}</p>`), 500);
// retrieveWeatherdescription();
// }

const insertWeatherdata = () => {
    // weatherDescription.innerHTML = `${weatherObject.weather[0].description}`;
    weatherDescription.innerHTML = weatherObject.weather[0].description;
    mainTemperature.innerHTML = weatherObject.main.temp;
    sunrise.innerHTML = weatherObject.sys.sunrise;
    sunset.innerHTML = weatherObject.sys.sunset;
    weatherIcon.setAttribute("src", pickWeathersymbol);
    dailyWeathertips.innerHTML = pickWeathertip;
    forecastDay1.innerHTML = forecastObject.list[0].dt_txt;
    forecastTem1.innerHTML = "0 degree";
    forecastDay2.innerHTML = forecastObject.list[8].dt_txt;
    forecastTem2.innerHTML = "0 degree";
    forecastDay3.innerHTML = forecastObject.list[16].dt_txt;
    forecastTem3.innerHTML = "0 degree";
    forecastDay4.innerHTML = forecastObject.list[24].dt_txt;
    forecastTem4.innerHTML = "0 degree";
    forecastDay5.innerHTML = forecastObject.list[32].dt_txt;
    forecastTem5.innerHTML = "0 degree";
};

const convertToCelsius = (value) => {
    celsiusValue = kelvinValue - 273.15;
}

// Event listeners -----------------------------------------



// CODE STARTS HERE
fetchWeather();

// test if any data are received
// setTimeout(() => {
//     console.log(weatherObject);
//     console.log(weatherObject.weather[0].description);
// }, 1000);




