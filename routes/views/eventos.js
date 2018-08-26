var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    //Init locals
    locals.section = 'eventos';
    locals.data = {
      news: []
    };

	var Eventos = keystone.list('Evento');
	var Seccao = keystone.list('Seccao');

	view.query('eventos', Eventos.model.find({estado:'publicada'}).sort('dataEvento').limit(10));
	view.query('contactos', Seccao.model.findOne({slug:'contactos'}));
	view.query('localtreino', Seccao.model.findOne({slug:'local'}));
	locals.data.dataactual = new Date();

    //Renderiza o template
    view.render('listaeventos');

};
