var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

// Create a new Keystone list called Noticia
var Evento = new keystone.List('Evento', {
  map: {name:'titulo'}, 	
  autokey: { path: 'slug', from: 'titulo', unique: true },
  defaultSort: '-criadoEm',
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
  imagem: { type: Types.CloudinaryImage },
  dataEvento: { 
    type: Date, 
    default: Date.now },
  publicadoEm: Date,
  descricaoEvento: { 
    type: Types.Html, 
    wysiwyg: true, 
    height: 600 
  },
  localizacaoEvento: { 
    type: String, 
    required: false 
  }
});

// Setting the default order of the columns on the admin tab
Evento.defaultColumns = 'titulo, estado|20%, autor, publicadoEm|15%';
Evento.register();
