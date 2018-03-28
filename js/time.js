
(function() {
    const moment = require('moment');

    function updateDateTime() {
        dateStr = moment().format("dddd, MMMM D YYYY");
        timeStr = moment().format("h:mm:ss A");

        document.querySelector("#datetime #date").innerText = dateStr; // + " " + timeStr;
        document.querySelector("#datetime #time").innerText = timeStr; // + " " + timeStr;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
})();