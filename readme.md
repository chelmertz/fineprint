# fineprint
fineprint provides a visual spotlight leading the visitor's eyes right through your really long document. Perfect for your license agreement or otherwise really, really important stuff.

No extra HTML is to be added. Of course the page works 100% even without javascript.

You, as a publisher, **can be certain that your audience reads what's most important**.

## Usage
	$('#license_agreement').fineprint({
		'countdown': 20, // How long should the fineprint-enhancement last?
		'initialDelay': 5, // how long should the 
		'submit': $('#submit'),
	});

Scenario: the #submit-element will be deactivated on page load, every **strong/em** element that is a child element of #license_agreement will be highlighted in order, during 20 seconds (countdown), starting 5 seconds after page load (initialDelay).

The amount of time an element is highlighted depends on its length compared to the sum of all texts-to-be-highlighted in #license_agreement.

### Example 1
	
	<div id="licence_agreement">
		<strong>This is very important</strong>, this not so much, but
		<strong>this is also important</strong>.
	</div>

The html above will enhance *This is very important* for 10 seconds, thereafter *this is also important* for 10 seconds. The strings are of equal length, therefore they get equal amount of time in the spotlight.

### Example 2

	<div id="license_agreement">
		<strong>Hello there!</strong>, isn't this just <strong>that plugin</strong> you've <strong>been looking for?</strong>
	</div>

 11 vs 10 vs 16 letters means that the first text will be displayed in 11 / 37 * 20 seconds.

### Demos
See the plugin in live action, it's located in the demos-subfolder
or
view the **screencast at http://iamnearlythere.tumblr.com/post/1684598613/just-finished-fineprint-which-is-a-jquery-plugin**
