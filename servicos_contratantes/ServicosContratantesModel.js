const connection = require('../database/database')

// Models
const Servicos = require('../servicos/ServicosModel')
const Contratantes = require('../contratantes/ContratantesModel')

const ServicosContratantes = connection.define('servicos_contratantes')

Servicos.belongsToMany(Contratantes, { through: ServicosContratantes })
Contratantes.belongsToMany(Servicos, { through: ServicosContratantes })

ServicosContratantes.sync({ force: false })
	.then(() => {
		console.log('Tabela ServicosContratantes criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela ServicosContratantes. ' + erro)
	})

module.exports = ServicosContratantes