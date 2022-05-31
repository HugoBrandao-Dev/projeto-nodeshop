const Sequelize = require('sequelize')
const connection = require('../database/database')

const Newsletter = connection.define('newsletter', {
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

Newsletter.sync({ force: false })
	.then(() => {
		console.log('Tabela Newsletter criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Newsletter. ' + erro)
	})

module.exports = Newsletter