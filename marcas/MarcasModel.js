const Sequelize = require('sequelize')
const connection = require('../database/database')

const Marcas = connection.define('marcas', {
  marca: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Marcas.sync({ force: false })
  .then(() => {
    console.log('Tabela Marcas criada com sucesso.')
  })
  .catch(erro => {
    console.log('Erro na criação da tabela Marcas. ' + erro)
  })

module.exports = Marcas
