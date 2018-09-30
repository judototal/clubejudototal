var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

// Create a new Keystone list called Noticia
var Noticia = new keystone.List('Noticia', {
  map: {name:'titulo'}, 	
  autokey: { path: 'slug', from: 'titulo', unique: true },
  defaultSort: '-criadoEm',
});

// Finally we are gonna add the fields for our Recipe
Noticia.add({
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
  textoNoticia: { 
    type: Types.Html, 
    wysiwyg: true, 
    height: 600 
  },
  imagem: { type: Types.CloudinaryImage }
});

// Setting the default order of the columns on the admin tab
Noticia.defaultColumns = 'titulo, estado|20%, autor, publicadoEm|15%';
Noticia.register();
