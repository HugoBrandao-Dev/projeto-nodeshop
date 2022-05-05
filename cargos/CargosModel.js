const Sequelize = require('sequelize')
const connection = require('../database/database')

const Cargos = connection.define('cargos', {
	cargo: {
		type: Sequelize.STRING,
		allowNull: false
	},
	salario: {
		type: Sequelize.FLOAT.UNSIGNED,
		allowNull: false
	}
})

Cargos.sync({ force: false })
	.then(() => {
		console.log('Tabela Cargos criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Cargos. ' + erro)
	})

module.exports = Cargos