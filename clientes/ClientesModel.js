const Sequelize = require('sequelize')
const connection = require('../database/database')

const Clientes = connection.define('clientes', {
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cpf: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	nascimento: {
		type: Sequelize.DATEONLY,
		allowNull: false
	},
	endereco: {
		type: Sequelize.STRING,
		allowNull: false
	},
	informacoesAdicionais: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	telefone: {
		type: Sequelize.STRING,
		allowNull: true
	},
	celular: {
		type: Sequelize.STRING,
		allowNull: true
	}
})

Clientes.sync({ force: false })
	.then(() => {
		console.log('Tabela Clientes criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Clientes.')
	})

module.exports = Clientes