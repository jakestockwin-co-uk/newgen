var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Profile Model
 * ==========
 */
var Profile = new keystone.List('Profile');

Profile.add({
	name: { type: Types.Name, required: true, index: true },
	bio: { type: Types.Html, wysiwyg: true },
	picture: { type: Types.CloudinaryImage },
});


/**
 * Registration
 */
Profile.defaultColumns = 'name';
Profile.register();
