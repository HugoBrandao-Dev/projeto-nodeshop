const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()

// Models
const Clientes = require('./ClientesModel')

// Funções
function getDataMaxima() {
	let data = new Date()
	let ano = parseInt(data.getFullYear())
	let mes = () => {
		if ((data.getMonth() + 1) < 10) {
			return `0${ parseInt(data.getMonth()) + 1}`
		} else {
			return data.getMonth() + 1
		}
	}
	let dia = data.getDate()
	return `${ ano }-${ mes() }-${ dia }`
}

let clientes = [
	{
		id: 0,
		nome: 'Tobias de Oliveira',
		cpf: '111.111.111-11',
		nascimento: '30/01/1992',
		endereco: 'Bairro: Oliveira I, Rua: Tobias de Oliveira, N: 100',
		email: 'tobias@gmail.com',
		telefone: '5511111111111',
		celular: '5511111111112'
	},
	{
		id: 1,
		nome: 'Dinorá de Oliveira',
		cpf: '222.222.222-22',
		nascimento: '15/02/1993',
		endereco: 'Bairro: Oliveira IV, Rua: Dinorá de Oliveira, N: 300',
		email: 'dinora_oliveira@gmail.com',
		telefone: '5522222222222',
		celular: '5522222222223'
	},
	{
		id: 2,
		nome: 'Josias Cruz',
		cpf: '333.333.333-33',
		nascimento: '04/06/1995',
		endereco: 'Bairro: Cruz III, Rua: Josias Cruz, N: 500',
		email: 'josias_cruz@hotmail.com',
		telefone: '5533333333333',
		celular: '5533333333334'
	},
	{
		id: 3,
		nome: 'Doralice Cruz',
		cpf: '444.444.444-44',
		nascimento: '20/10/1990',
		endereco: 'Bairro: Cruz II, Rua: Doralice Cruz, N: 1000',
		email: 'dora_cruz@hotmail.com',
		telefone: '5544444444444',
		celular: '5544444444445'
	}
]

// Rotas do administrador
router.get('/admin/clientes', (req, res) => {
	Clientes.findAll()
		.then(clientes => {
			res.render('admin/clientes/clientesLista', { admin: 1, clientes })
		})
})

router.get('/admin/cliente/novo', (req, res) => {
	res.render('admin/clientes/clienteNovo', { admin: 1, dataMaxima: getDataMaxima() })
})

router.post('/admin/cliente/salvar', (req, res) => {
	let nome = req.body.iptNome
	let cpf = req.body.iptCpf
	let nascimento = req.body.iptNascimento
	let endereco = req.body.iptEndereco
	let informacoes = req.body.iptInformacoes
	let email = req.body.iptEmail
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular

	Clientes.create({
		nome,
		cpf,
		nascimento,
		endereco,
		informacoesAdicionais: informacoes,
		email,
		telefone,
		celular
	}).then(() => {
		res.redirect('/admin/clientes')
	})
})

router.get('/admin/cliente/editar/:id', (req, res) => {
	let id = req.params.id
	Clientes.findByPk(id)
		.then(cliente => {
			res.render('admin/clientes/clienteEditar', { admin: 1, cliente })
		})
})

router.post('/admin/cliente/atualizar', (req, res) => {
	let id = req.body.iptId
	let nome = req.body.iptNome
	let cpf = req.body.iptCpf
	let nascimento = req.body.iptNascimento
	let endereco = req.body.iptEndereco
	let informacoes = req.body.iptInformacoes
	let email = req.body.iptEmail
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular

	Clientes.update({
		nome,
		cpf,
		nascimento,
		endereco,
		informacoesAdicionais: informacoes,
		email,
		telefone,
		celular
	}, {
		where: {
			id
		}
	}).then(() => {
		res.redirect('/admin/clientes')
	})
})

router.get('/admin/cliente/:id', (req, res) => {
	let id = req.params.id
	let cliente = clientes.filter(cliente => cliente.id == id)[0]
	res.render('admin/clientes/clienteInfo', { admin: 1, cliente})
})

module.exports = router