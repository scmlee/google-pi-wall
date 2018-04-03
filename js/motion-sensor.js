(function () {
    var five = require("johnny-five");
    var Raspi = require("raspi-io");

    var board = new five.Board({
        io: new Raspi()
    });

    var SCREENOFF_DELAY = 30; //Seconds

    board.on("ready", function () {
        var l = new five.LCD({
            controller: "PCF8574AT",
            address: 0x38
        });

        var led = new five.Led("GPIO18");
        var motion = new five.Motion("GPIO17");
        var date = new Date();
        var turned_off = false;
        var last_motion_time = date.now();

        motion.on("calibrated", function () {
            console.log("calibrated");
            l.clear();
            l.cursor(0, 0).print("PIR Calibrated");
        })

        motion.on("motionstart", function () {
            console.log("motionstart");
            led.on();

            last_motion_time = date.now();

            if (turned_off) {
                console.log("Time to turn on the screen");
                turned_off = false;
            }
        });

        motion.on("motionend", function () {
            console.log("motionend");
            led.off();

            if (!turned_off && date.now() > (last_motion_time + (SCREENOFF_DELAY * 1000))) {
                console.log("time to turn off the screen");
                turned_off = true;
            }
        });
    });

})();