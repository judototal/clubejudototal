var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    //Init locals
    locals.section = 'noticias';

    locals.data = {
      news: []
    };

	var Noticias = keystone.list('Noticia');
	var Seccao = keystone.list('Seccao');

	view.query('noticias', Noticias.model.find().sort('-publicadoEm'));
	view.query('contactos', Seccao.model.findOne({slug:'contactos'}));
	view.query('localtreino', Seccao.model.findOne({slug:'local'}));
/**
    //Carrega todas as noticias
      view.on('init', function(next){
   		
      keystone.list('Noticia').model.find().sort('-publicadoEm').exec(function(err, noticias) {
        if (err || !noticias.length){
 //          return next(err);
        }else{
	  locals.data.noticias = noticias;
//	  next(err);
	}
      });
	      
      keystone.list('Seccao').model.findOne({slug:'contactos'}).exec(function(err, contactos) {
        if (err || !contactos.length){
//           return next(err);
        }else{
	   locals.data.contactos = contactos;
//	   next(err);      
	}	
      });

      keystone.list('Seccao').model.findOne({slug:'local'}).exec(function(err, localtreino) {
        if (err || !localtreino.length){
	   return next(err);
        }else{
	   locals.data.localtreino = localtreino;
           next(err);
	}
      });
    });
**/

    //Renderiza o template
    view.render('listanoticias');

};
