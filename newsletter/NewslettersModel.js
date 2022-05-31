const Sequelize = require('sequelize')
const connection = require('../database/database')

const Newsletters = connection.define('newsletters', {
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
})

Newsletters.sync({ force: false })
	.then(() => {
		console.log('Tabela Newsletters criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Newsletters. ' + erro)
	})

module.exports = Newsletters