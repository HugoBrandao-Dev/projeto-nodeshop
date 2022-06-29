const Sequelize = require('sequelize')
const connection = require('../database/database')

// Models
const Clientes = require('../clientes/ClientesModel')

const Compras = connection.define('compras', {
	total: {
		type: Sequelize.FLOAT(11, 2).UNSIGNED,
		allowNull: false
	},
	createdAt: {
		type: Sequelize.DATE,
		get: function() {
			return this.getDataValue('createdAt').toLocaleString('pt-BR', { timezone: 'UTC' })
		}
	}
})

Compras.belongsTo(Clientes)
Clientes.hasMany(Compras)

Compras.sync({ force: false })
	.then(() => {
		console.log('Tabela Compras criada com sucesso.')
	})
	.catch(erro => {
		console.log('Erro na criação da tabela Compras. ' + erro)
	})

module.exports = Compras
