(function() {
    const weather = require('openweather-apis');
    const moment = require('moment');
    const weatherIcons = require("../weatherIcons.json");
    const numPeriodsToForecast = 4;
    const weatherRefreshMin = 15;

    console.log(weatherIcons);

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

    function updateWeather() {
        console.log("Attemping to update the weather...");

        if (!process.env.openweather_api_key || process.env.openweather_api_key == "") {
            document.querySelector("div#weather").innerText = "OpenWeatherMaps API Key not defined!";
            return;
        }

        weather.setLang('en');
        weather.setCityId(6167865);
        weather.setUnits('metric');
        weather.setAPPID(process.env.openweather_api_key);
	
	console.log(process.env.openweather_api_key);
        
	document.querySelector("div#weather").innerText = "Querying current weather...";
        weather.getSmartJSON(function(err, smart) {
            var forecastDiv = "";

            // console.log("Got the weather: " + JSON.stringify(smart));

            forecastDiv += "<div id=\"forecast\" class=\"current\">";
            forecastDiv += "<span id=\"temp\">" + Math.round(smart.temp) + "<span id=\"temp-units\">&deg;</span></span>";
            forecastDiv += "<span id=\"weather\" desc=\"" + smart.description + "\"><i class=\"" + getWeatherIconClass(smart.weathercode) +  "\"></i></span>";
            forecastDiv += "</div>";

            document.querySelector("div#weather").innerText = "Querying weather forecast...";
            //Grab forecast for near future...
            weather.getWeatherForecast(function(err, forecast) {
                var currForecastIter = 0;

                for (currForecastIter = 0; currForecastIter < numPeriodsToForecast; currForecastIter++) {
                    forecastDetails = forecast.list[currForecastIter];

                    //console.log(forecastDetails);
                    forecastDiv += "<div id=\"forecast\">";
                    forecastDiv += "<span id=\"time\">" + moment(forecastDetails.dt, "X").fromNow() + "</span>";
                    forecastDiv += "<span id=\"temp\">" + Math.round(forecastDetails.main.temp) + "<span id=\"temp-units\">&deg;</span></span>";
                    forecastDiv += "<span id=\"weather\" desc=\"" + forecastDetails.weather[0].id + "\"><i class=\"" + getWeatherIconClass(forecastDetails.weather[0].id) +  "\"></i></span>";
                    forecastDiv += "</div>"
                }

                //Update the web page
                document.querySelector("div#weather").innerHTML = forecastDiv;

                //Update again in 30 minutes
                setTimeout(updateWeather, 1000 * 60 * weatherRefreshMin);
            });
        });
    }

    setTimeout(updateWeather, 1000);
})();
