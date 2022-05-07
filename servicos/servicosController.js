const express = require('express')
const router = express.Router()

// Models
const Cargos = require('../cargos/CargosModel')
const Setores = require('../setores/SetoresModel')
const Funcionarios = require('../funcionarios/FuncionariosModel')

let servicos = [
	{
		id: 0,
		servico: 'Manutenção em redes de computadores',
		responsaveis: ['Tobias de Oliveira'],
		descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime neque quis eos sint, tempore delectus tenetur pariatur? Ad similique nobis eaque quibusdam corporis architecto veritatis placeat, dolor deleniti quaerat mollitia.'
	},
	{
		id: 1,
		servico: 'Manutenção em banco de dados',
		responsaveis: ['Tobias de Oliveira', 'Dinorá de Oliveira'],
		descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime neque quis eos sint, tempore delectus tenetur pariatur? Ad similique nobis eaque quibusdam corporis architecto veritatis placeat, dolor deleniti quaerat mollitia.'
	},
	{
		id: 2,
		servico: 'Manutenção em computadores',
		responsaveis: ['Josias Cruz', 'Doralice Cruz'],
		descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime neque quis eos sint, tempore delectus tenetur pariatur? Ad similique nobis eaque quibusdam corporis architecto veritatis placeat, dolor deleniti quaerat mollitia.'
	}
]

router.get('/servicos', (req, res) => {
	res.render('servicos', { admin: 0, servicos})
})

router.get('/servico/:id', (req, res) => {
	let id = req.params.id
	let servico = servicos.filter(servico => servico.id == id)[0]
	res.render('servico', { admin: 0, servico})
})

// Rotas do Administrador
router.get('/admin/servicos', (req, res) => {
	res.render('admin/servicos/servicosLista', { admin: 1, servicos})
})

router.get('/admin/servico/edit/:id', (req, res) => {
	let id = req.params.id
	let servico = servicos.filter(servico => servico.id == id)[0]
	res.render('admin/servicos/servicoEditar', { admin: 1, servico })
})

router.get('/admin/servico/novo', (req, res) => {
	res.render('admin/servicos/servicoCadastrar', { admin: 1 })
})

router.get('/admin/servicos/opcoes', (req, res) => {
	Funcionarios.findAll({
		include: [
			{ model: Cargos },
			{ model: Setores }
		]
	})
		.then(funcionarios => {
			Cargos.findAll()
				.then(cargos => {
					Setores.findAll()
						.then(setores => {
							res.render('admin/servicos/servicoOpcao', { admin: 1, funcionarios, cargos, setores })
						})
				})
		})
})

router.post('/admin/servicos/opcoes/salvar/cargo', (req, res) => {
	let cargo = req.body.iptCargo
	let salario = Number.parseFloat(req.body.iptSalario)

	let cargoLower = cargo.toLowerCase()

	Cargos.create({
		cargo: cargoLower,
		salario
	}).then(() => {
		res.redirect('/admin/servicos/opcoes')
	})
	.catch(erro => {
		res.send('Erro no cadastro de um novo Cargo.')
	})
})

router.post('/admin/servicos/opcoes/salvar/setor', (req, res) => {
	let setor = req.body.iptSetor

	let setorLower = setor.toLowerCase()

	Setores.create({
		setor: setorLower,
	}).then(() => {
		res.redirect('/admin/servicos/opcoes')
	})
	.catch(erro => {
		res.send('Erro no cadastro de um novo Setor.')
	})
})

router.post('/admin/servicos/opcoes/salvar/funcionario', (req, res) => {
	let nome = req.body.iptNome
	let cpf = req.body.iptCPF
	let setor = req.body.sltSetor
	let cargo = req.body.sltCargo

	let nomeLower = nome.toLowerCase()

	Funcionarios.create({
		nome: nomeLower,
		cpf,
		setoreId: setor,
		cargoId: cargo
	}).then(() => {
		res.redirect('/admin/servicos/opcoes')
	})
	.catch(erro => {
		res.send('Erro no cadastro de um novo Funcionário.')
	})
})

router.post('/admin/servico/salvar', (req, res) => {
	let servico = req.body.iptServico
	let responsaveis = req.body.iptResponsaveis
	let descricao = req.body.textDescricao

	res.json({
		servico,
		responsaveis,
		descricao
	})
})

router.post('/admin/servico/atualizar', (req, res) => {
	let servico = req.body.iptServico
	let responsaveis = req.body.iptResponsaveis
	let descricao = req.body.textDescricao

	res.json({
		servico,
		responsaveis,
		descricao
	})
})

router.get('/admin/servico/:id', (req, res) => {
	let id = req.params.id
	let servico = servicos.filter(servico => servico.id == id)[0]
	res.render('admin/servicos/servicoInfo', { admin: 1, servico })
})

module.exports = router
