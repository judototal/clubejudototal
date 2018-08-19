var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    //Init locals
    locals.section = 'noticias';
    locals.filters = {slug: req.params.slug};
	
    locals.data = {
      news: []
    };
	locals.data.slug = locals.filters.slug;

	var Noticias = keystone.list('Noticia');
	var Seccao = keystone.list('Seccao');

	view.query('noticias', Noticias.model.find().sort('-publicadoEm'));
	view.query('contactos', Seccao.model.findOne({slug:'contactos'}));
	view.query('localtreino', Seccao.model.findOne({slug:'local'}));

    //Renderiza o template
    view.render('noticiadetalhe');

};
