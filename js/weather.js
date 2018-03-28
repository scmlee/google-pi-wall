
(function() {
    const weather = require('openweather-apis');

    function updateWeather() {
        console.log("Attemping to update the weather...");
        
        weather.setLang('en');
        weather.setCityId(6167865);
        weather.setUnits('metric');
        weather.setAPPID("dde2509e29d41e5299304dad3099db68");

        weather.getSmartJSON(function(err, smart){
            document.querySelector("div#weather").innerText = Math.round(smart.temp) + " " + smart.description;

            //Set the next timeout only if it had successfully returned
            setTimeout(updateWeather, 1000 * 60 * 30);
        });

        // weather.getWeatherForecastForDays(3, function(err, obj) {
        //     console.log(obj);
        // });
    }

    //updateWeather();
    //setInterval(updateWeather, 1000 * 60 * 30);
    //etInterval(updateWeather, 5000);
})();