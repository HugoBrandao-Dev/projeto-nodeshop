const connection = require('../database/database')

// Models
const Servicos = require('../servicos/ServicosModel')
const Contratantes = require('../contratantes/ContratantesModel')
const StatusContratacoes = require('../status_contratacoes/StatusContratacoesModel')

const ServicosContratantes = connection.define('servicos_contratantes', { })

ServicosContratantes.belongsTo(Servicos)
Servicos.hasMany(ServicosContratantes)

ServicosContratantes.belongsTo(Contratantes)
Contratantes.hasMany(ServicosContratantes)

ServicosContratantes.belongsTo(StatusContratacoes)
StatusContratacoes.hasMany(ServicosContratantes)

ServicosContratantes.sync({ force: false })
	.then(() => {
		console.log('Tabela ServicosContratantes criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela ServicosContratantes. ' + erro)
	})

module.exports = ServicosContratantes