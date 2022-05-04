const Sequelize = require('sequelize')
const connection = require('../database/database')

// Models para relacionamento entre tabelas
const Categorias = require('../categorias/CategoriasModel')
const Tipos = require('../tipos/TiposModel')
const Marcas = require('../marcas/MarcasModel')

const Produtos = connection.define('produtos', {
  modelo: {
    type: Sequelize.STRING,
    allowNull: false
  },
	descricao: {
		type: Sequelize.TEXT,
		allowNull: true
	},
  anoFabricacao: {
    type: Sequelize.SMALLINT.UNSIGNED,
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

Tipos.hasMany(Produtos)
Produtos.belongsTo(Tipos)

Categorias.hasMany(Produtos)
Produtos.belongsTo(Categorias)

Marcas.hasMany(Produtos)
Produtos.belongsTo(Marcas)

Produtos.sync({ force: false })
  .then(() => {
    console.log('Tabela Produtos criada com sucesso.')
  })
  .catch(erro => {
    console.log('Erro na criação da tabela Produtos. ' + erro)
  })

module.exports = Produtos
