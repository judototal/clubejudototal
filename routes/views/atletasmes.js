var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    //Init locals
    locals.section = 'atletames';

    locals.data = {
      news: []
    };

	var AtletaMes = keystone.list('AtletaMes');
	var Seccao = keystone.list('Seccao');

	view.query('atletames', AtletaMes.model.find({estado:'publicada'}).sort('-publicadoEm').limit(6));
	view.query('contactos', Seccao.model.findOne({slug:'contactos'}));
	view.query('localtreino', Seccao.model.findOne({slug:'local'}));

    //Renderiza o template
    view.render('listaatletasmes');

};
