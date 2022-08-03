const express = require('express')
const router = express.Router()
const usuarioAuth = require('../middlewares/usuarioAuth')

const Servicos = require('../servicos/ServicosModel')
const Contratantes = require('../contratantes/ContratantesModel')
const ServicosContratantes = require('../servicos_contratantes/ServicosContratantesModel')

router.get('/admin/contratantes', (req, res) => {
	Servicos.findAll()
		.then(servicos => {
			Contratantes.findAll()
				.then(contratantes => {
					res.render('admin/servicos_contratantes/novo', { servicos, contratantes })
				})
		})
})

router.post('/admin/contratantes/salvarNovo', (req, res) => {
	let servico = req.body.iptServico
	let contratante = req.body.iptContratante
	let identificacao = req.body.iptIdentificacao
	let email = req.body.iptEmail
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular
	let informacoesAdicionais = req.body.textInformacoes

	Contratantes.create({
		contratante,
		identificacao,
		email,
		telefone,
		celular,
		informacoesAdicionais
	}).then(registro => {
		ServicosContratantes.create({
			servicoId: servico,
			contratanteId: registro.dataValues.id
		}).then(() => {
			res.redirect('/admin/contratantes')
		})
	})
})

router.post('/admin/contratantes/salvarCadastrado', (req, res) => {
	let servico = req.body.iptServico
	let contratante = req.body.iptContratante

	ServicosContratantes.create({
		servicoId: servico,
		contratanteId: contratante
	}).then(() => {
		res.redirect('/admin/contratantes')
	}).catch(erro => {
		console.log(erro)
		res.send('A empresa já possui este serviço em aberto.')
	})
})

module.exports = router