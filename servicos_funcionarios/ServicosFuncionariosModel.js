const Sequelize = require('sequelize')
const connection = require('../database/database')

// Models
const Servicos = require('../servicos/ServicosModel')
const Funcionarios = require('../funcionarios/FuncionariosModel')

const ServicosFuncionarios = connection.define('servicos_funcionarios', {})

Servicos.belongsToMany(Funcionarios, { through: ServicosFuncionarios })
Funcionarios.belongsToMany(Servicos, { through: ServicosFuncionarios })

ServicosFuncionarios.sync({ force: false })
	.then(() => {
		console.log("Tabela Servicos_funcionarios criada com sucesso.")
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Servicos_funcionarios. ' + erro)
	})

module.exports = ServicosFuncionarios