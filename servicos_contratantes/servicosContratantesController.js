const express = require('express')
const router = express.Router()
const usuarioAuth = require('../middlewares/usuarioAuth')

const Servicos = require('../servicos/ServicosModel')
const Contratantes = require('../contratantes/ContratantesModel')
const ServicosContratantes = require('../servicos_contratantes/ServicosContratantesModel')
const StatusContratacoes = require('../status_contratacoes/StatusContratacoesModel')

router.get('/admin/contratacoes', (req, res) => {
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

router.get('/admin/contratacao/cadastrar', (req, res) => {
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

router.post('/admin/contratacao/atualizar', (req, res) => {
	let id = req.body.iptId
	let servico = Number.parseInt(req.body.iptServico)

	let contratanteNovo = req.body.iptContratanteNovo
	let contratanteCadastrado = Number.parseInt(req.body.iptContratanteCadastrado)
	
	let identificacao = req.body.iptIdentificacao
	let email = req.body.iptEmail
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular
	let informacoesAdicionais = req.body.textInformacoes
	let status = Number.parseInt(req.body.iptStatus)

	if (contratanteNovo) {
		Contratantes.create({
			contratante: contratanteNovo,
			identificacao,
			email,
			telefone,
			celular,
			informacoesAdicionais
		}).then(registro => {
			ServicosContratantes.update({
				servicoId: servico,
				statusContratacoId: status,
				contratanteId: registro.dataValues.id
			}, {
				where: {
					id
				}
			}).then(() => {
				res.redirect('/admin/contratacoes')
			})
		})
	} else {
		ServicosContratantes.update({
			servicoId: servico,
			contratanteId: contratanteCadastrado,
			statusContratacoId: status
		}, {
			where: {
				id
			}
		}).then(() => {
			Contratantes.update({
				identificacao,
				email,
				telefone,
				celular,
				informacoesAdicionais
			}, {
				where: {
					id: contratanteCadastrado
				}
			}).then(() => {
				res.redirect('/admin/contratacoes')
			})
		})
	}
})

router.post('/admin/contratacao/salvarNovo', (req, res) => {
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
			res.redirect('/admin/contratacoes')
		})
	})
})

router.post('/admin/contratacao/salvarCadastrado', (req, res) => {
	let servico = req.body.iptServico
	let contratante = req.body.iptContratante

	ServicosContratantes.create({
		servicoId: servico,
		contratanteId: contratante,
		statusContratacoId: 1
	}).then(() => {
		res.redirect('/admin/contratacoes')
	}).catch(erro => {
		console.log(erro)
		res.send('A empresa já possui este serviço em aberto.')
	})
})

router.get('/admin/contratacao/:id', (req, res) => {
	let id = req.params.id

	ServicosContratantes.findByPk(id, {
		include: [
			{ model: Servicos },
			{ model: Contratantes },
			{ model: StatusContratacoes }
		]
	}).then(contratacao => {
			console.log(contratacao)
			res.render('admin/servicos_contratantes/ServicosContratantesInfo', { contratacao })
		})
})

router.post('/admin/contratacao/deletar', (req, res) => {
	let id = req.body.iptContratanteID

	ServicosContratantes.destroy({
		where: {
			contratanteId: id
		}
	}).then(() => {
		Contratantes.destroy({
			where: {
				id
			}
		}).then(() => {
			res.redirect('/admin/contratacoes')
		})
	})
})

module.exports = router