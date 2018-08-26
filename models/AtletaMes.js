var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

// Criar uma lista de keystone para o Atleta do Mês
var AtletaMes = new keystone.List('AtletaMes', {
  map: {name:'nome'}, 	
  autokey: { path: 'slug', from: 'nome', unique: true },
  defaultSort: '-criadoEm',
});

// Adicionar a opção para adicionar a imagem do Atleta do Mês 
var atletaImgStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
     // required; path where the files should be stored
    path: keystone.expandPath('public/images'),
    generateFilename: function (file, index) {
      return file.originalname;
    },
    whenExists: 'error',
     // path where files will be served
    publicPath: '/public/images',
  },
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
  imagem: {
    type: Types.File,
    storage: atletaImgStorage,
    mimetype: '.jpeg, .jpg, .gif, .svg',
  },
  textoDescritivo: { 
    type: Types.Html, 
    wysiwyg: true, 
    height: 600 
  }
});

// Setting the default order of the columns on the admin tab
AtletaMes.defaultColumns = 'nome, estado|20%, autor, publicadoEm|15%';
AtletaMes.register();
