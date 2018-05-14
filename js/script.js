"use scrict";

window.onload = function() {
	Leap.loop({ background: false, enableGestures: true },
		function(frame) {
			// debugger
			// console.log(frame);
			if (frame.valid && frame.gestures.length > 0) {
				var gesture = frame.gestures[0];
				if (gesture.type === 'swipe' && gesture.state === 'stop') {
					// Get the absolute movement along the x and y axis
					var xMove = Math.abs(gesture.direction[0]),
						yMove = Math.abs(gesture.direction[1]);
					if (xMove > 0.3) {
						if (gesture.direction[0] < 0) {
							console.log("Right")
							// Reveal.next();
						}
						else {
							console.log("Left")
							// Reveal.prev();
						}
					}
					else if (yMove > 0.3) {
						if (gesture.direction[1] < 0) {
							console.log("Down")
						}
						else {
							console.log("Up")
						}
					}
				}
			}
		})
		.connect();
};