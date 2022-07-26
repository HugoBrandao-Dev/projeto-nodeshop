const express = require('express')
const router = express.Router()
const usuarioAuth = require('../middlewares/usuarioAuth')

const Servicos = require('../servicos/ServicosModel')

router.get('/admin/contratantes', (req, res) => {
	Servicos.findAll()
		.then(servicos => {
			res.render('admin/servicos_contratantes/novo', { servicos })
		})
})

module.exports = router