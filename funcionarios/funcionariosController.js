const express = require('express')
const router = express.Router()

// Models
const Cargos = require('../cargos/CargosModel')
const Setores = require('../setores/SetoresModel')
const Funcionarios = require('../funcionarios/FuncionariosModel')

let funcionarios = [
	{
		id: 0,
		nome: 'Tobias de Oliveira',
		cpf: '111.111.111-11',
		nascimento: '30/01/1992',
		endereco: 'Bairro: Oliveira I, Rua: Tobias de Oliveira, N: 100',
		email: 'tobias@gmail.com',
		telefone: '5511111111111',
		celular: '5511111111112',
		setor: 'Atendimento',
		cargo: 'Atendente'
	},
	{
		id: 1,
		nome: 'Dinorá de Oliveira',
		cpf: '222.222.222-2',
		nascimento: '15/02/1993',
		endereco: 'Bairro: Oliveira IV, Rua: Dinorá de Oliveira, N: 300',
		email: 'dinora_oliveira@gmail.com',
		telefone: '5522222222222',
		celular: '5522222222223',
		setor: 'Assistência técnica',
		cargo: 'Técnico(a) assistente'
	},
	{
		id: 2,
		nome: 'Josias Cruz',
		cpf: '333.333.333-3',
		nascimento: '04/06/1995',
		endereco: 'Bairro: Cruz III, Rua: Josias Cruz, N: 500',
		email: 'josias_cruz@hotmail.com',
		telefone: '5533333333333',
		celular: '5533333333334',
		setor: 'Assistência técnica',
		cargo: 'Técnico(a) assistente'
	},
	{
		id: 3,
		nome: 'Doralice Cruz',
		cpf: '444.444.444-4',
		nascimento: '20/10/1990',
		endereco: 'Bairro: Cruz II, Rua: Doralice Cruz, N: 1000',
		email: 'dora_cruz@hotmail.com',
		telefone: '5544444444444',
		celular: '5544444444445',
		setor: 'Gerência',
		cargo: 'Gerente'
	}
]

router.get('/admin/funcionarios', (req, res) => {
	Funcionarios.findAll({
		include: [
			{ model: Cargos },
			{ model: Setores }
		]
	})
	.then(funcionarios => {
		res.render('admin/funcionarios/funcionariosLista', { admin: 1, funcionarios })
	})
})

router.get('/admin/funcionario/novo', (req, res) => {
	Cargos.findAll()
		.then(cargos => {
			Setores.findAll()
				.then(setores => {
					res.render('admin/funcionarios/funcionarioNovo', { admin: 1, cargos, setores })
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
							res.render('admin/funcionarios/funcionarioEditar', { admin: 1, funcionario, cargos, setores })
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
	let funcionario = funcionarios.filter(funcionario => funcionario.id == id)[0]
	res.render('admin/funcionarios/funcionarioInfo', { admin: 1, funcionario })
})

router.get('/admin/funcionarios/opcoes', (req, res) => {
	Cargos.findAll()
		.then(cargos => {
			Setores.findAll()
				.then(setores => {
					res.render('admin/funcionarios/funcionarioOpcao', { admin: 1, cargos, setores })
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