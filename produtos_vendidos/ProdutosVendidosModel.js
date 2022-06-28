const Sequelize = require('sequelize')
const connection = require('../database/database')

const Compras = require('../compras/ComprasModel')

const ProdutosVendidos = connection.define('produtos_vendidos', {
	quantidade: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		defaultValue: 1
	}
})

Compras.hasMany(ProdutosVendidos)

ProdutosVendidos.sync({ force: false })
	.then(() => {
		console.log('Tabela Produtos_vendidos criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Produtos_vendidos. ' + erro)
	})

module.exports = ProdutosVendidos
