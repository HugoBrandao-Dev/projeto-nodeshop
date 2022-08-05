const Sequelize = require('sequelize')
const connection = require('../database/database')

const StatusContratacoes = connection.define('status_contratacoes', {
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

StatusContratacoes.sync({ force: false })
  .then(() => {
    console.log('Tabela StatusContratacoes criada com sucesso.')
  })
  .catch(erro => {
    console.log('Erro na criação da tabela StatusContratacoes. ' + erro)
  })

module.exports = StatusContratacoes