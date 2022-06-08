const Sequelize = require('sequelize')
const connection = require('../database/database')

const Compras = connection.define('compras', {
	total: {
		type: Sequelize.FLOAT(11, 2).UNSIGNED,
		allowNull: false
	}
})

Compras.sync({ force: false })
	.then(() => {
		console.log('Tabela Compras criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Compras. ' + erro)
	})

module.exports = Compras
