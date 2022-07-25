const Sequelize = require('sequelize')
const connection = require('../database/database')

const Contratantes = connection.define('contratantes', {
	contratante: {
		type: Sequelize.STRING,
		allowNull: false
	},
	identificacao: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	telefone: {
		type: Sequelize.STRING,
		allowNull: false
	},
	celular: {
		type: Sequelize.STRING,
		allowNull: false
	},
	informacoesAdicionais: {
		type: Sequelize.TEXT,
		allowNull: true
	}
});

Contratantes.sync({ force: false })
	.then(() => {
		console.log('Tabela Contratantes criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Contratantes. ' + erro)
	})

module.exports = Contratantes