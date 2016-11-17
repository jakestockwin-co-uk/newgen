var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var success = true;

	// Enquiry handling
	view.on('post', { action: 'contact' }, function (next) {
		// We will only hit this if things have gone wrong!
		var application = new Enquiry.model();
		var updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: false,
		}, function (err) {
			if (err) {
				console.log('ERR', err);
				success = false;
			}
			if (success) {
				res.redirect('/?success=true#contact');
			} else {
				// Redirect the POST to index. This only happens when something has gone wrong.
				// The index page will try again, and should display the correct validation messages.
				res.redirect(307, '/?success=false#contact');
			}
		});


	});

	view.render('index');

};
