const Sequelize = require('sequelize')
const connection = require('../database/database')

const Setores = connection.define('setores', {
	setor: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

Setores.sync({ force: false })
	.then(() => {
		console.log('Tabela Setores criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Setores. ' + erro)
	})

module.exports = Setores