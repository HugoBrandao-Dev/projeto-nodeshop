const Sequelize = require('sequelize')
const connection = require('../database/database')

const Tipos = connection.define("tipos", {
  tipo: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Tipos.sync({ force: false })
  .then(() =>{
    console.log('Tabela Tipos criada com sucesso.')
  })
  .catch(error =>{
    console.log('Erro na criação da tabela Tipos. ' + error)
  })

module.exports = Tipos
