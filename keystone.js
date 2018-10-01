// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var Twig = require('twig');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'cjt',
	'brand': 'cjt',
	'cloudinary config': 'cloudinary://176948449596524:wybWDMnZejgqJpsLu1CDMqomatY@de360zoli',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'twig',
	'twig options': { method: 'fs' },
	'custom engine': Twig.render,
	'emails': 'templates/emails',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Utilizador',
	'logger': ':method :url :status :res[content-length] - :response-time ms',
	'compress':true
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	utilizadors: 'utilizadors',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}
/** 
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    keystone.set('mongo', process.env.OPENSHIFT_MONGODB_DB_URL);
}
*/
if (process.env.OPENSHIFT_NODEJS_IP) {
  keystone.set('host', process.env.OPENSHIFT_NODEJS_IP);
}
if (process.env.OPENSHIFT_NODEJS_PORT) {
  keystone.set('port', process.env.OPENSHIFT_NODEJS_PORT);
}


keystone.start();
