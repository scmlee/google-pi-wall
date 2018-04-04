(function() {
    const moment = require('moment');
    const weatherIcons = require("../weatherIcons.json");
    const numPeriodsToForecast = 4;
    const weatherRefreshMin = 15;

    // const debugHttp = require('debug-http');
    // debugHttp();

    // console.log(process.env.http_proxy);

    var request = require('request');

    function updateDateTime() {
        document.querySelector("#datetime #date").innerText = moment().format("dddd, MMMM D");
        document.querySelector("#datetime #time").innerText = moment().format("h:mm A");
    }

    var currentTempOpenWeatherObj, forecastOpenWeatherObj;

    /**
     * Returns Font-awesome class for the weather condition
     * @param {*} weather
     */
    function getWeatherIconClass(code) {
        var prefix = "wi wi-";
        var icon = weatherIcons[code].icon;

        // If we are not in the ranges mentioned above, add a day/night prefix.
        if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            icon = 'day-' + icon;
        }

        // Finally tack on the prefix.
        icon = prefix + icon;
        return icon;
    }

    function getOpenWeatherAPIUrl(openweatherReq, urlEndPoint) {
        var url = "http://api.openweathermap.org";

        url += urlEndPoint;
        url += "?id=" + openweatherReq.cityId;
        url += "&units=" + openweatherReq.units;
        url += "&lang=" + openweatherReq.lang;
        url += "&mode=json";
        url += "&APPID=" + process.env.openweather_api_key;

        return url;
    }

    function updateCurrentTempHTML() {
        if (!currentTempOpenWeatherObj) {
            console.log("No current temp details to update");
            return;
        }

        var currentWeatherDiv = "";
        currentWeatherDiv += "<div id=\"forecast\" class=\"current\">";
        currentWeatherDiv += "<span id=\"temp\">" + Math.round(currentTempOpenWeatherObj.main.temp) + "<span id=\"temp-units\">&deg;</span></span>";
        currentWeatherDiv += "<span id=\"weather\" desc=\"" + currentTempOpenWeatherObj.weather[0].description + "\"><i class=\"" + getWeatherIconClass(currentTempOpenWeatherObj.weather[0].id) + "\"></i></span>";
        currentWeatherDiv += "</div>";

        document.querySelector("div#weather #current-container").innerHTML = currentWeatherDiv;
    }

    function updateForecastHTML() {
        if (!updateForecastHTML) {
            console.log("No forecast details to update");
            return;
        }

        var forecastWeatherDiv = "";
        var currForecastIter = 0;

        for (currForecastIter = 0; currForecastIter < numPeriodsToForecast; currForecastIter++) {
            forecastDetails = forecastOpenWeatherObj.list[currForecastIter];

            //console.log(forecastDetails);
            forecastWeatherDiv += "<div id=\"forecast\">";
            forecastWeatherDiv += "<span id=\"time\">" + moment(forecastDetails.dt, "X").fromNow() + "</span>";
            forecastWeatherDiv += "<span id=\"temp\">" + Math.round(forecastDetails.main.temp) + "<span id=\"temp-units\">&deg;</span></span>";
            forecastWeatherDiv += "<span id=\"weather\" desc=\"" + forecastDetails.weather[0].id + "\"><i class=\"" + getWeatherIconClass(forecastDetails.weather[0].id) + "\"></i></span>";
            forecastWeatherDiv += "</div>"
        }

        //Update the web page
        document.querySelector("div#weather #forecast-container").innerHTML = forecastWeatherDiv;
    }

    function updateWeather() {
        console.log("Attemping to update the weather...");

        if (!process.env.openweather_api_key || process.env.openweather_api_key == "") {
            document.querySelector("div#weather").innerText = "OpenWeatherMaps API Key not defined!";
            return;
        }

        var openweatherReq = {
            lang: 'en',
            cityId: 6167865,
            units: 'metric',
            appId: process.env.openweather_api_key
        };

        request({
            'url': getOpenWeatherAPIUrl(openweatherReq, '/data/2.5/weather'),
            'proxy': process.env.http_proxy
        }, function(error, response, body) {

            if (error || response.statusCode != 200) {
                document.querySelector("div#weather #current-container").innerHTML = "!";
                return;
            }

            currentTempOpenWeatherObj = JSON.parse(body);
            updateCurrentTempHTML();
        });

        request({
            'url': getOpenWeatherAPIUrl(openweatherReq, '/data/2.5/forecast'),
            'proxy': process.env.http_proxy
        }, function(error, response, body) {

            if (error || response.statusCode != 200) {
                document.querySelector("div#weather #forecast-container").innerHTML = "!";
                return;
            }

            forecastOpenWeatherObj = JSON.parse(body);
            updateForecastHTML();
        });

        //Update again in 30 minutes
        setTimeout(updateWeather, 1000 * 60 * weatherRefreshMin);
    }

    //Refresh the date and weather
    updateDateTime();
    updateWeather();

    //Schedule updates to the HTML
    //setInterval(updateCurrentTempHTML, 1000 * 60);
    setInterval(updateForecastHTML, 1000 * 60);
    setInterval(updateDateTime, 10000);
})();