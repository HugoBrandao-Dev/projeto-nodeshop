const Sequelize = require('sequelize')
const connection = require('../database/database')

// Models
const Setores = require('../setores/SetoresModel')
const Cargos = require('../cargos/CargosModel')

const Funcionarios = connection.define('funcionarios', {
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cpf: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

Funcionarios.belongsTo(Setores)
Setores.hasMany(Funcionarios)

Funcionarios.belongsTo(Cargos)
Cargos.hasMany(Funcionarios)

Funcionarios.sync({ force: false })
	.then(() => {
		console.log('Tabela Funcionarios criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Funcionarios. ' + erro)
	})

module.exports = Funcionarios