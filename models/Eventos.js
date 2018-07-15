var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

// Create a new Keystone list called Noticia
var Evento = new keystone.List('Evento', {
  map: {name:'titulo'}, 	
  autokey: { path: 'slug', from: 'titulo', unique: true },
  defaultSort: '-criadoEm',
});

// Adding the option to add an image to our Noticia from 
var eventoImgStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
     // required; path where the files should be stored
    path: keystone.expandPath('server/public/img'),
    generateFilename: function (file, index) {
      return file.originalname;
    },
    whenExists: 'error',
     // path where files will be served
    publicPath: '/public/img',
  },
});

// Finally we are gonna add the fields for our Recipe
Evento.add({
  titulo: { 
    type: String, 
    required: true },
  estado: { 
    type: Types.Select, 
    options: 'rascunho, publicada, arquivada', 
    default: 'rascunho' },
  autor: { 
    type: Types.Relationship, 
    ref: 'Utilizador' 
  },
	criadoEm: { 
    type: Date, 
    default: Date.now },
  publicadoEm: Date,
  imagem: {
    type: Types.File,
    storage: eventoImgStorage,
    mimetype: '.jpeg, .jpg, .gif, .svg',
  },
  dataEvento: { 
    type: Date, 
    default: Date.now },
  publicadoEm: Date,
  textoEvento: { 
    type: Types.Html, 
    wysiwyg: true, 
    height: 600 
  }
});

// Setting the default order of the columns on the admin tab
Evento.defaultColumns = 'titulo, estado|20%, autor, publicadoEm|15%';
Evento.register();
