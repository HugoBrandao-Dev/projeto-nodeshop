const Sequelize = require('sequelize')
const connection = require('../database/database')

const Estoques = connection.define('estoques', {
  estoque: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  }
})

Estoques.sync({ force: true })
  .then(() => {
    console.log('Tabela Estoques criada com sucesso.')
  })
  .catch(erro => {
    console.log('Erro na criação da tabela Estoques. ' + erro)
  })

module.exports = Estoques
