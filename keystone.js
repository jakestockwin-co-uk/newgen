// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

keystone.init({

	'name': 'Newgen',
	'brand': 'Newgen',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'model prefix': 'newgen',

	'mongo options': { server: { keepAlive: 1 } },

});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

if (keystone.get('env') === 'production') {
	keystone.set('session store', 'connect-mongo');
}

keystone.set('routes', require('./routes'));


keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
	enquiries: 'enquiries',
});

keystone.start();
