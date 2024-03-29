const Sequelize = require('sequelize')
const connection = require('../database/database')

const Produtos = require('../produtos/ProdutosModel')

const Estoques = connection.define('estoques', {
  estoque: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  }
})

Produtos.hasOne(Estoques)
Estoques.belongsTo(Produtos)

Estoques.sync({ force: false })
  .then(() => {
    console.log('Tabela Estoques criada com sucesso.')
  })
  .catch(erro => {
    console.log('Erro na criação da tabela Estoques. ' + erro)
  })

module.exports = Estoques
