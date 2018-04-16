(function() {
    const weather = require('openweather-apis');
    const moment = require('moment');
    const debugHttp = require('debug-http');
    //debugHttp();

    console.log("Attemping to update the weather...");

    weather.setLang('en');
    weather.setCityId(6167865);
    weather.setUnits('metric');
    weather.setAPPID(process.env.openweather_api_key);
    var request = require('request');
    request({
        'url': 'http://api.openweathermap.org/data/2.5/forecast?id=6167865&units=metric&lang=en&mode=json&APPID=' + process.env.openweather_api_key,
        }, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

    // console.log(process.env.openweather_api_key);
    // weather.getSmartJSON(function(err, smart) {
    //     //document.querySelector("div#weather").innerText = Math.round(smart.temp) + " " + smart.description;

    //     //Set the next timeout only if it had successfully returned
    //     //setTimeout(updateWeather, 1000 * 60 * 30);

    //     console.log(smart);
    // });

    // weather.getWeatherForecast(function(err, forecast) {
    //     //console.log(JSON.stringify(forecast, null, 4));
    //     //console.log(JSON.stringify(forecast));

    //     var numDaysToForecast = 3;
    //     var currForecastIter = 0;
    //     for (currForecastIter = 0; currForecastIter < numDaysToForecast; currForecastIter++) {
    //         forecastDetails = forecast.list[currForecastIter];

    //         var prettyDateTime = moment(forecastDetails.dt_txt).fromNow();

    //         console.log(moment(forecastDetails.dt, "X").fromNow());

    //         console.log("Dt " + forecastDetails.dt);
    //         console.log("Forecast for " + prettyDateTime);
    //         console.log("Forecast for " + forecastDetails.dt_txt);
    //         console.log("Temp =  " + forecastDetails.main.temp);
    //         console.log("Description = " + forecastDetails.weather[0].main);
    //         console.log("Description = " + forecastDetails.weather[0].description);
    //     }

    // });

})();