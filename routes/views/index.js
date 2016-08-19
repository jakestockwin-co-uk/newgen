var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Retrieve profiles
	view.on('init', function (next) {
		keystone.list('Profile').model.find().exec(function (err, results) {
			locals.profiles = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
