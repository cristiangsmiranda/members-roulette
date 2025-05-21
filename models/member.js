const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  Nome: { type: String, required: true },
  Sexo: { type: String, required: true },
  Idade: { type: Number, required: true },
  Endereco: String,
  Email: String,
  Telefone: String,
  DataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);
