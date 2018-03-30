'use strict';
// const { ipcRenderer } = require('electron');
// const task = require('../shared/task');

// window.onload = function () {
// 	ipcRenderer.on('background-start', (startTime) => {
// 		ipcRenderer.send('background-response', {
// 			result: task(),
// 			startTime: startTime
// 		});
// 	});
// };

(function () {
	// var five = require("johnny-five");
	// var Raspi = require("raspi-io");

	// var board = new five.Board({
	// 	io: new Raspi()
	// });

	// var SCREENOFF_DELAY = 30; //Seconds

	// board.on("ready", function () {
	// 	var l = new five.LCD({
	// 		controller: "PCF8574AT",
	// 		address: 0x38
	// 	});

	// 	var led = new five.Led("GPIO18");
	// 	var motion = new five.Motion("GPIO17");
	// 	var date = new Date();
	// 	var turned_off = false; 
	// 	var last_motion_time = date.now(); 

	// 	motion.on("calibrated", function () {
	// 		console.log("calibrated");
	// 		l.clear();
	// 		l.cursor(0, 0).print("PIR Calibrated");
	// 	})

	// 	motion.on("motionstart", function () {
	// 		console.log("motionstart");
	// 		led.on();
	// 	});

	// 	motion.on("motionend", function () {
	// 		console.log("motionend");
	// 		led.off();
	// 	});

	// });

})();;