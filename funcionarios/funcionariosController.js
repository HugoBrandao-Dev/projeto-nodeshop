const express = require('express')
const router = express.Router()

// Models
const Cargos = require('../cargos/CargosModel')
const Setores = require('../setores/SetoresModel')
const Funcionarios = require('../funcionarios/FuncionariosModel')

router.get('/admin/funcionarios', (req, res) => {
	Funcionarios.findAll({
		include: [
			{ model: Cargos },
			{ model: Setores }
		]
	})
	.then(funcionarios => {
		res.render('admin/funcionarios/funcionariosLista', { funcionarios })
	})
})

router.get('/admin/funcionario/novo', (req, res) => {
	Cargos.findAll()
		.then(cargos => {
			Setores.findAll()
				.then(setores => {
					res.render('admin/funcionarios/funcionarioNovo', { cargos, setores })
				})
		})
})

router.post('/admin/funcionario/salvar', (req, res) => {
	let nome = req.body.iptNome
	let cpf = req.body.iptCpf
	let nascimento = req.body.iptNascimento
	let endereco = req.body.iptEndereco
	let email = req.body.iptEmail
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular
	let setor = req.body.sltSetor
	let cargo = req.body.sltCargo
	let informacoes = req.body.textInformacoes

	let nomeLower = nome.toLowerCase()

	Funcionarios.create({
		nome: nomeLower,
		cpf,
		nascimento,
		endereco,
		telefone,
		celular,
		email,
		informacoesAdicionais: informacoes,
		setoreId: setor,
		cargoId: cargo
	}).then(() => {
		res.redirect('/admin/funcionarios')
	})
		.catch(erro => {
			res.send('Erro no cadastro de um novo Funcionário.')
		})
})

router.get('/admin/funcionario/editar/:id', (req, res) => {
	let id = req.params.id
	Funcionarios.findByPk(id)
		.then(funcionario => {
			Cargos.findAll()
				.then(cargos => {
					Setores.findAll()
						.then(setores => {
							res.render('admin/funcionarios/funcionarioEditar', { funcionario, cargos, setores })
						})
				})
		})
})

router.post('/admin/funcionario/deletar', (req, res) => {
	let id = req.body.iptId
	Funcionarios.destroy({
		where: {
			id
		}
	}).then(resultado => {
		res.redirect('/admin/funcionarios')
	}).catch(erro => {
		console.log(erro)
	})
})

router.get('/admin/funcionario/:id', (req, res) => {
	let id = req.params.id
	Funcionarios.findByPk(id, {
		include: [
			{ model: Setores },
			{ model: Cargos }
		]
	})
		.then(funcionario => {
			res.render('admin/funcionarios/funcionarioInfo', { funcionario })
		})
})

router.get('/admin/funcionarios/opcoes', (req, res) => {
	Cargos.findAll()
		.then(cargos => {
			Setores.findAll()
				.then(setores => {
					res.render('admin/funcionarios/funcionarioOpcao', { cargos, setores })
				})
		})
})

router.post('/admin/funcionarios/opcoes/cargo/salvar', (req, res) => {
	let cargo = req.body.iptCargo
	let salario = Number.parseFloat(req.body.iptSalario)

	let cargoLower = cargo.toLowerCase()

	Cargos.create({
		cargo: cargoLower,
		salario
	}).then(() => {
		res.redirect('/admin/funcionarios/opcoes')
	})
		.catch(erro => {
			res.send('Erro no cadastro de um novo Cargo.')
		})
})

router.post('/admin/funcionarios/opcoes/setor/salvar', (req, res) => {
	let setor = req.body.iptSetor

	let setorLower = setor.toLowerCase()

	Setores.create({
		setor: setorLower,
	}).then(() => {
		res.redirect('/admin/funcionarios/opcoes')
	})
		.catch(erro => {
			res.send('Erro no cadastro de um novo Setor.')
		})
})

module.exports = router