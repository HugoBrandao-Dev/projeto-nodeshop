const Sequelize = require('sequelize')
const connection = require('../database/database')

const Produtos = require('../produtos/ProdutosModel')
const Clientes = require('../clientes/ClientesModel')
const Compras = require('../compras/ComprasModel')

const ProdutosVendidos = connection.define('produtos_vendidos', {})

Produtos.belongsToMany(Clientes, { through: ProdutosVendidos})
Clientes.belongsToMany(Produtos, { through: ProdutosVendidos})
Compras.hasMany(ProdutosVendidos)

ProdutosVendidos.sync({ force: false })
	.then(() => {
		console.log('Tabela Produtos_vendidos criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Produtos_vendidos. ' + erro)
	})

module.exports = ProdutosVendidos