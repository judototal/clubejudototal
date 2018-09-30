var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

// Criar uma lista de keystone para o Atleta do Mês
var AtletaMes = new keystone.List('AtletaMes', {
  map: {name:'nome'}, 	
  autokey: { path: 'slug', from: 'nome', unique: true },
  defaultSort: '-criadoEm',
});

// Nesta estrutura adicionamos os campos 
AtletaMes.add({
  nome: { 
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
  textoDescritivo: { 
    type: Types.Html, 
    wysiwyg: true, 
    height: 600 
  },
  descricaoImagem: { 
    type: String, 
    required: false },
  imagem: { type: Types.CloudinaryImage }
});

// Setting the default order of the columns on the admin tab
AtletaMes.defaultColumns = 'nome, estado|20%, autor, publicadoEm|15%';
AtletaMes.register();
