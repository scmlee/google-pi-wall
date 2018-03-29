
(function() {
    const moment = require('moment');

    function updateDateTime() {
        document.querySelector("#datetime #date").innerText = moment().format("dddd, MMMM D YYYY"); 
        document.querySelector("#datetime #time").innerText =  moment().format("h:mm A"); 
    }

    updateDateTime();
    setInterval(updateDateTime, 5000);
})();