jQuery.fn.fineprint = function(options) {

	if("object" !== typeof options || "undefined" == typeof options.submit) {
		return this;
	}

	var settings = {
		afterCountdown: function() {},
		beforeCountdown: function() {},
		countdown: 30,
		initialDelay: 5,
		style: {
			'backgroundColor': 'black',
			'color': '#fff',
			'fontSize': '30px',
			'fontWeight': 'bold',
			'padding': '3px'
		},
		temporaryButtonValue: 'Read the highlighted text before accepting'
	};

	$.extend(settings, options);

	var submitButton = options.submit;
	var originalButtonText = submitButton.val();
	submitButton.attr('disabled', 'disabled');
	
	// Enable the form again
	var done = function() {
		submitButton.attr('disabled', '').val(originalButtonText);
		if(typeof settings.afterCountdown === "function") {
			settings.afterCountdown();
		}
	};

	if(settings.temporaryButtonValue.indexOf('%s') != -1) {
		// The configuration included the magical '%s' which tell us a countdown should be started
		var secondsLeft = settings.countdown+settings.initialDelay;
		console.log(settings);
		var interval = setInterval(
			function() {
				if(1 === secondsLeft) {
					done();
					clearInterval(interval);
					return;
				}
				submitButton.val(settings.temporaryButtonValue.replace('%s', secondsLeft));
				secondsLeft -= 1;
			},
			1000	
		);
	} else {
		// The button keeps a temporary value throughout the entire countdown... a bit boring
		submitButton.val(settings.temporaryButtonValue);
	}

	// Container used on a per-element basis, containing the pre-enhanced stylesheet rules of the strong
	var oldStyle = {};

	var text = this;
	var emphasizingElements = text.find('strong, em');
	var emphasizingElementsCount = emphasizingElements.length;
	var totalCharactercount = emphasizingElements.text().length;

	var totalReservedTime = 0;

	// Let the user scan the page before throwing emphasized wordings at her
	setTimeout(
		function() {
			if(typeof settings.beforeCountdown === "function") {
				settings.beforeCountdown();
			}
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

						// If the iteration is over, the user should be able to continue by submitting the form
						if(index === emphasizingElementsCount - 1) {
							done();
						}
					},
					totalReservedTime
				);

			});
		},
		parseInt(settings.initialDelay)*1000
	);
	
	// Enable chaining
	return this;
};
