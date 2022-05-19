const Sequelize = require('sequelize')
const connection = require('../database/database')

// Models
const Clientes = require('../clientes/ClientesModel')

const LoginClientes = connection.define('login_clientes', {
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Clientes.hasOne(LoginClientes)
LoginClientes.belongsTo(Clientes)

LoginClientes.sync({ force: false })
  .then(() => {
    console.log('Tabela Login_clientes criada com sucesso.')
  })
  .catch(() => {
    console.log('Erro na criação da tabela Login_clientes.')
  })

module.exports = LoginClientes
