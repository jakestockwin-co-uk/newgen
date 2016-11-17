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
	locals.enquirySubmitted = false;

	view.on('post', { action: 'contact' }, function (next) {

		var application = new Enquiry.model();
		var updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});

	});

	// Render the view
	view.render('index');
};
