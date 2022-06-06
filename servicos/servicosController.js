const express = require('express')
const router = express.Router()
const usuarioAuth = require('../middlewares/usuarioAuth')

// Models
const Servicos = require('./ServicosModel')
const Funcionarios = require('../funcionarios/FuncionariosModel')
const ServicosFuncionarios = require('../servicos_funcionarios/ServicosFuncionariosModel')

router.get('/servicos', (req, res) => {
	Servicos.findAll()
		.then(servicos => {
			res.render('servicos', { servicos })
		})
})

router.get('/servico/:id', (req, res) => {
	let id = req.params.id
	Servicos.findByPk(id, {
		include: [
			{ model: Funcionarios }
		]
	}).then(servico => {
		res.render('servico', { servico })
	})
})

// Rotas do Administrador
router.get('/admin/servicos', (req, res) => {
	Servicos.findAll({
		include: [
			{
				model: Funcionarios
			}
		]
	}).then(servicos => {
		res.render('admin/servicos/servicosLista', { servicos })
	})
})

router.get('/admin/servico/editar/:id', (req, res) => {
	let id = req.params.id
	Servicos.findByPk(id, {
		include: [
			{ model: Funcionarios }
		]
	}).then(servico => {
		Funcionarios.findAll()
		.then(funcionarios => {
			const idsResponsaveis = servico.funcionarios.map(func => func.id)
			res.render('admin/servicos/servicoEditar', { servico, funcionarios, idsResponsaveis })
		})
	})
})

router.get('/admin/servico/novo', (req, res) => {
	Funcionarios.findAll()
	.then(funcionarios => {
		res.render('admin/servicos/servicoCadastrar', { funcionarios })
	})
})

router.post('/admin/servico/salvar', (req, res) => {
	let servico = req.body.iptServico
	let responsaveis = [...req.body.iptResponsaveis]
	let descricao = req.body.textDescricao

	Servicos.create({
		servico,
		descricao
	}).then(registro => {
		responsaveis.forEach(responsavel => {
			ServicosFuncionarios.create({
				servicoId: registro.dataValues.id,
				funcionarioId: responsavel
			})
		})
		res.redirect('/admin/servicos')
	})
})

router.post('/admin/servico/atualizar', (req, res) => {
	let id = req.body.iptId
	let servico = req.body.iptServico
	let responsaveis = [...req.body.iptResponsaveis]
	let descricao = req.body.textDescricao

	ServicosFuncionarios.destroy({
		where: {
			servicoId: id
		}
	}).then(() => {
		responsaveis.forEach(funcId => {
			ServicosFuncionarios.create({
				servicoId: id,
				funcionarioId: funcId
			})
		})
		res.redirect('/admin/servicos')
	})
})

router.get('/admin/servico/:id', (req, res) => {
	let id = req.params.id

	Servicos.findByPk(id, {
		include: [
			{ model: Funcionarios }
		]
	}).then(servico => {
		res.render('admin/servicos/servicoInfo', { servico })
	})
})

router.post('/admin/servico/deletar', (req, res) => {
	let id = req.body.iptId

	ServicosFuncionarios.destroy({
		where: {
			servicoId: id
		}
	}).then(() => {
		Servicos.destroy({
			where: {
				id
			}
		}).then(() => {
			res.redirect('/admin/servicos')
		})
	})
})

module.exports = router
