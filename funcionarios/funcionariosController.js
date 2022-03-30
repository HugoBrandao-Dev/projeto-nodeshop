const express = require('express')
const router = express.Router()

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
		setor: 'Assitência técnica',
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
		setor: 'Assitência técnica',
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
	res.render('admin/funcionarios/funcionariosLista', { admin: 1, funcionarios })
})

router.get('/admin/funcionario/novo', (req, res) => {
	res.render('admin/funcionarios/funcionarioNovo', { admin: 1 })
})

router.post('/admin/funcionario/salvar', (req, res) => {
	let id = req.body.iptId
	let nome = req.body.iptNome
	let cpf = req.body.iptCpf
	let nascimento = req.body.iptNascimento
	let endereco = req.body.iptEndereco
	let email = req.body.iptEmail
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular
	let setor = req.body.iptSetor
	let cargo = req.body.iptCargo
	res.json({
		id,
		nome,
		cpf,
		nascimento,
		endereco,
		email,
		telefone,
		celular,
		setor,
		cargo,
	})
})

router.get('/admin/funcionario/edit/:id', (req, res) => {
	let id = req.params.id
	let funcionario = funcionarios.filter(funcionario => funcionario.id == id)[0]
	res.render('admin/funcionarios/funcionarioEditar', { admin: 1, funcionario })
})

router.get('/admin/funcionario/:id', (req, res) => {
	let id = req.params.id
	let funcionario = funcionarios.filter(funcionario => funcionario.id == id)[0]
	res.render('admin/funcionarios/funcionarioInfo', { admin: 1, funcionario })
})

module.exports = router