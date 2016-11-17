var keystone = require('keystone');
var Types = keystone.Field.Types;
var nodemailer = require('nodemailer');

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

Enquiry.schema.pre('save', function (next) {
	if (!this.isNew) {
		next(new Error('You cannot make changes to enquiries'));
	} else {
		next();
	}
});


Enquiry.schema.post('save', function (enquiry) {
	var config = {
		host: 'smtp.zoho.com',
		port: 465,
		secure: true,
		authMethod: 'LOGIN',
		auth: {
			user: 'noreply@jakestockwin.co.uk',
			pass: process.env.ZOHO_PASSWORD,
		},
	};

	var transporter = nodemailer.createTransport(config);

	if (process.env.TRAVIS) {
		console.log('Not sending email during testing');
		return true;
	}
	var message = 'You have recieved a new enqiry from ' + enquiry.name.full + '.<br>'
		+ ' To see the details, <a href="https://www.newgenbrokers.co.uk/keystone/enquiries/' + enquiry._id + '">click here.';
	var mailOptions = {
		from: '"jakestockwin.co.uk" <noreply@jakestockwin.co.uk>', // sender address
		to: (keystone.get('env') === 'production') ? 'admin@newgenbrokers.co.uk' : 'jake@jakestockwin.co.uk', // list of receivers
		subject: 'New website enquiry', // Subject line
		html: message, // plaintext body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		console.log('New enquiry recieved. Sending emails');
		if (err) {
			console.log('Error sending email:');
			console.log(err);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});

});

Enquiry.track = true;
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
