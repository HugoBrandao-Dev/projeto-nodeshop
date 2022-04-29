const Sequelize = require('sequelize')
const connection = require('../database/database')

// Models para relacionamento entre tabelas
const Categorias = require('../categorias/CategoriasModel')
const Tipos = require('../tipos/TiposModel')
const Marcas = require('../marcas/MarcasModel')
const Estoques = require('../estoques/EstoquesModel')

const Produtos = connection.define('produtos', {
  modelo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tiposId: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false
  },
  categoriasId: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false
  },
  marcasId: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false
  },
  anoFabricacao: {
    type: Sequelize.DATE,
    allowNull: false
  },
  garantiaLoja: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false
  },
  garantiaFabricante: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false
  },
  preco: {
    type: Sequelize.FLOAT.UNSIGNED,
    allowNull: false
  }
})

Produtos.hasMany(Tipos)
Produtos.hasMany(Categorias)
Produtos.hasMany(Marcas)
Produtos.belongsTo(Estoques)

Produtos.sync({ force: true })
  .then(() => {
    console.log('Tabela Produtos criada com sucesso.')
  })
  .catch(erro => {
    console.log('Erro na criação da tabela Produtos. ' + erro)
  })

module.exports = Produtos
