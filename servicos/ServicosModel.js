const Sequelize = require('sequelize')
const connection = require('../database/database')

const Servicos = connection.define('servicos', {
	servico: {
		type: Sequelize.STRING,
		allowNull: false
	},
	descricao: {
		type: Sequelize.TEXT,
		allowNull: true
	}
})

Servicos.sync({ force: false })
	.then(() => {
		console.log('Tabela Servicos criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela de Servicos. ' + erro)
	})

module.exports = Servicos