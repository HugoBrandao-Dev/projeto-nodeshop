const express = require('express')
const router = express.Router()
const usuarioAuth = require('../middlewares/usuarioAuth')

const Servicos = require('../servicos/ServicosModel')
const Contratantes = require('../contratantes/ContratantesModel')
const ServicosContratantes = require('../servicos_contratantes/ServicosContratantesModel')
const StatusContratacoes = require('../status_contratacoes/StatusContratacoesModel')

router.get('/admin/contratantes', (req, res) => {
	ServicosContratantes.findAll({
		include: [
			{ model: Servicos },
			{ model: Contratantes },
			{ model: StatusContratacoes }
		],
		order: [
			['id', 'ASC']
		]
	}).then(contratacoes => {
		res.render('admin/servicos_contratantes/ServicosContratantesLista', { contratacoes })
	})
})

router.get('/admin/contratantes/cadastrar', (req, res) => {
	StatusContratacoes.findAll()
		.then(resultado => {
			if (resultado.length == 0) {
				StatusContratacoes.bulkCreate([
					{ status: 'aberto' },
					{ status: 'em andamento' },
					{ status: 'finalizado' }
				]).then(() => {
					console.log('Registrados os status para contratações.')
				})
			}
		})
	Servicos.findAll()
		.then(servicos => {
			Contratantes.findAll()
				.then(contratantes => {
					res.render('admin/servicos_contratantes/novo', { servicos, contratantes })
				})
		})
})

router.get('/admin/contratacao/editar/:id', (req, res) => {
	let id = req.params.id

	ServicosContratantes.findByPk(id, {
		include: [
				{ model: Servicos },
				{ model: Contratantes },
				{ model: StatusContratacoes }
			]
		}).then(contratacao => {
			Servicos.findAll()
				.then(servicos => {
					Contratantes.findAll()
						.then(contratantes => {
							StatusContratacoes.findAll()
								.then(statusDisponiveis => {
									res.render('admin/servicos_contratantes/ServicosContratantesEditar', {
											contratacao,
											servicos,
											contratantes,
											statusDisponiveis
									})
								})
						})
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
			contratanteId: registro.dataValues.id,
			statusContratacoId: 1
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
		contratanteId: contratante,
		statusContratacoId: 1
	}).then(() => {
		res.redirect('/admin/contratantes')
	}).catch(erro => {
		console.log(erro)
		res.send('A empresa já possui este serviço em aberto.')
	})
})

module.exports = router