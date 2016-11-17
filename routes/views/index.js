var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.posts = [];

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Retrieve profiles
	view.on('init', function (next) {
		keystone.list('Post').paginate({
			page: 1,
			perPage: 2,
			maxPages: 1,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories')
			.exec(function (err, results) {
				locals.posts = results;
				next(err);
			});


	});

	// Enquiry handling

	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = req.query.success || false;
	locals.error = false;
	locals.success = req.query.success;

	view.on('post', { action: 'contact' }, function (next) {
		// We will only hit this if things have gone wrong!
		locals.error = true;
		var application = new Enquiry.model();
		var updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
		}, function (err) {
			if (err) {
				// This should always happen, as it failed for contact.js
				locals.validationErrors = err.errors;
			} else {
				// This should never happen, but if it does then everything is fine.
				locals.errors = false;
				locals.success = true;
			}
			next();
		});

	});

	// Render the view
	view.render('index');
};
