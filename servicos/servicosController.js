const express = require('express')
const router = express.Router()

let servicos = [
	{
		id: 0,
		servico: 'Manutenção em redes de computadores',
		responsaveis: ['Tobias de Oliveira'],
	},
	{
		id: 1,
		servico: 'Manutenção em banco de dados',
		responsaveis: ['Tobias de Oliveira', 'Dinorá de Oliveira'],
	},
	{
		id: 2,
		servico: 'Manutenção em computadores',
		responsaveis: ['Josias Cruz', 'doralice Cruz'],
	}
]

// Rotas do Administrador
router.get('/admin/servicos', (req, res) => {
	res.render('admin/servicos/servicosLista', { admin: 1, servicos})
})

module.exports = router