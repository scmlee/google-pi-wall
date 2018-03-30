(function() {
    const weather = require('openweather-apis');
    const moment = require('moment');

    console.log("Attemping to update the weather...");

    weather.setLang('en');
    weather.setCityId(6167865);
    weather.setUnits('metric');
    weather.setAPPID(process.env.openweather_api_key); //"dde2509e29d41e5299304dad3099db68");

    // weather.getSmartJSON(function(err, smart) {
    //     //document.querySelector("div#weather").innerText = Math.round(smart.temp) + " " + smart.description;

    //     //Set the next timeout only if it had successfully returned
    //     //setTimeout(updateWeather, 1000 * 60 * 30);

    //     console.log(smart);
    // });

    weather.getWeatherForecast(function(err, forecast) {
        //console.log(JSON.stringify(forecast, null, 4));
        //console.log(JSON.stringify(forecast));

        var numDaysToForecast = 3;
        var currForecastIter = 0;
        for (currForecastIter = 0; currForecastIter < numDaysToForecast; currForecastIter++) {
            forecastDetails = forecast.list[currForecastIter];

            var prettyDateTime = moment(forecastDetails.dt_txt).fromNow();

            console.log(moment(forecastDetails.dt, "X").fromNow());

            console.log("Dt " + forecastDetails.dt);
            console.log("Forecast for " + prettyDateTime);
            console.log("Forecast for " + forecastDetails.dt_txt);
            console.log("Temp =  " + forecastDetails.main.temp);
            console.log("Description = " + forecastDetails.weather[0].main);
            console.log("Description = " + forecastDetails.weather[0].description);
        }

    });

})();
