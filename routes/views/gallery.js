var keystone = require('keystone');
var Gallery = keystone.list('Gallery');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'gallery';
	var Seccao = keystone.list('Seccao');

	view.query('contactos', Seccao.model.findOne({slug:'contactos'}));
	view.query('localtreino', Seccao.model.findOne({slug:'local'}));


	view.query('galleries', Gallery.model.find().limit(10).sort('-publishedDate'));

	view.render('gallery');

}
