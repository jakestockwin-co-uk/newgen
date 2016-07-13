var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'about';
	locals.data = {
		profiles: [],
	};

	// Load profiles
	view.on('init', function (next) {

		var q = keystone.list('Profile').model.find();

		q.exec(function (err, results) {
			locals.data.profiles = results;
			next(err);
		});

	});

	// Render the view
	view.render('about');
};
