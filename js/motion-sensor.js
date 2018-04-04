(function () {
    var five = require("johnny-five");
    var Raspi = require("raspi-io");

    var board = new five.Board({
		repl: false,
		sigint: false,
        io: new Raspi()
    });

    var SCREENOFF_DELAY = 30; //Seconds
    
    var turnOffScreen = function () {
	}
	
	var turnOnScreen = function() {
	}
    

    board.on("ready", function () {
		try {
			var l = new five.LCD({
				controller: "PCF8574AT",
				address: 0x38
			});

			var led = new five.Led("GPIO18");
			var motion = new five.Motion("GPIO17");
			var turned_off = false;
			var last_motion_time = Date.now();

			l.cursor(0,0).print("Working...");

			motion.on("calibrated", function () {
				console.log("calibrated");
				l.clear();
				l.cursor(0, 0).print("PIR Calibrated");
			})

			motion.on("motionstart", function () {
				last_motion_time = Date.now();
				
				console.log(Date.now() + " motionstart");
				l.clear();
				l.cursor(0,0).print("motionstart");
				l.cursor(1,0).print(last_motion_time);
				led.on();


				if (turned_off) {
					console.log("Time to turn on the screen");
					turned_off = false;
				}
			});

			motion.on("motionend", function () {
				console.log(Date.now() + " motionend (lastmotiontime=" + last_motion_time + ")");
				
				l.clear();
				l.cursor(0,0).print("motionend");
				l.cursor(1,0).print(last_motion_time);
				
				led.off();

				if (!turned_off && Date.now() > (last_motion_time + (SCREENOFF_DELAY * 1000))) {
					console.log("time to turn off the screen");
					turned_off = true;
				}
			});
		} catch (error) {
			console.log("Something went wrong...");
			console.log(error);
		}
    });

})();
