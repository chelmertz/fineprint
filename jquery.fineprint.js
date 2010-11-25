jQuery.fn.fineprint = function(options) {

	var submitButton = this;

	if("object" !== typeof options || "undefined" == typeof options.text) {
		return this;
	}

	// todo: make compatible with jquery-ui's .highlight()
	var settings = {
		countdown: 30,
		dataKey: 'fineprintWeight',
		style: {
			'backgroundColor': 'black',
			'color': '#fff',
			'fontSize': '30px',
			'fontWeight': 'bold'
		}
	};

	$.extend(settings, options);

	// Make the user wait a bit to actually notice the fineprint
	var originalButtonText = submitButton.val();
	submitButton.attr('disabled', 'disabled').val('Read the license!');

	var oldStyle = {};

	var text = options.text;
	var emphasizingElements = text.find('strong, em');
	var totalCharactercount = emphasizingElements.text().length;

	// Loop-de-loop, iterate over each element and apply the highlight
	var totalReservedTime = 0;
	$.each(emphasizingElements, function(index, value) {
		var current = $(value);

		setTimeout(
			function() {
				// Save the original CSS, for a return point
				for(var key in settings.style) {
					oldStyle[key] = current.css(key);
					
					// Apply the new CSS rule
					current.css(key, settings.style[key]);
				}
			},
			totalReservedTime
		);

		// The currently emphasized text only last for a calculated amount of time
		var miliseconds = settings.countdown * (current.text().length/totalCharactercount) * 1000;
		totalReservedTime += parseInt(miliseconds);
		setTimeout(
			function() {
				// Doing the reset dance
				for(var key in settings.style) {
					current.css(key, oldStyle[key]);
				}
			},
			totalReservedTime
		);

	});
	
	// Enable the form again
	submitButton.attr('disabled', '').val(originalButtonText);
	
	// Enable chaining
	return this;
};
