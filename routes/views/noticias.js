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

    //Carrega todas as noticias
    view.on('init', function(next){
      keystone.list('Noticias').model.find().sort('titulo').exec(function(err, results) {
        if (err || !results.length){
           return next(err);
        }

        locals.data.noticias = results;
        next(err);
      });
    });


    //Renderiza o template
    view.render('listanoticias');

};
