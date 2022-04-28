const Sequelize = require('sequelize')
const connection = require('../database/database')

const Categorias = connection.define('categorias', {
  categoria: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Categorias.sync({ force: false })
  .then(() => {
    console.log('Tabela Categorias criada com sucesso.')
  })
  .catch(erro => {
    console.log('Erro na criação da tabela Categorias.')
  })

module.exports = Categorias
