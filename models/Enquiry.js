var keystone = require('keystone');
var Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	companyName: { type: String, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	message: { type: Types.Textarea, required: true },
});

Enquiry.track = true;
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
