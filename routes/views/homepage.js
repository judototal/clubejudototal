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
	locals.data.dataactual = new Date();

	var Noticias = keystone.list('Noticia');
	var Eventos = keystone.list('Evento');
	var AtletaMes = keystone.list('AtletaMes');
	var Seccao = keystone.list('Seccao');

	view.query('noticias', Noticias.model.find({estado:'publicada'}).sort('-publicadoEm').limit(3));
	view.query('eventos', Eventos.model.find().sort('-dataEvento').limit(10));
	view.query('atletames', AtletaMes.model.find().sort('-publicadoEm').limit(1));
	view.query('resultados', Seccao.model.findOne({slug:'resultados'}));
	view.query('contactos', Seccao.model.findOne({slug:'contactos'}));
	view.query('localtreino', Seccao.model.findOne({slug:'local'}));
	view.query('calltoaction', Seccao.model.findOne({slug:'call-to-action'}));

    //Renderiza o template
    view.render('homepage');

};
