const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()

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

let produtos = [
	{
		id: 0,
		categoria: 1,
		tipo: 1,
		marca: 'Dell',
		modelo: 'Dell2012',
		fabricacao: '2020',
		garantiaLoja: 2,
		garantiaFabricante: 4,
		descricao: 'Notebook Dell I5 10ª geração 256GB de armazenamento.',
		estoque: 100,
		preco: 5000,
	},
	{
		id: 1,
		categoria: 1,
		tipo: 1,
		marca: 'Apple',
		modelo: 'Macbook Air',
		fabricacao: '2020',
		garantiaLoja: 4,
		garantiaFabricante: 8,
		descricao: 'Macbook Air M1 500GB SSD de armazenamento.',
		estoque: 10,
		preco: 10000,
	}
]

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

router.get('/produtos', (req, res) => {
	res.render('produtos', { admin: 0, produtos })
})

router.get('/produto/:id', (req, res) => {
	let id = req.params.id
	let produto = produtos.filter(produto => produto.id == id)[0]
	res.render('produto', { admin: 0, produto })
})

router.get('/servicos', (req, res) => {
	res.render('servicos', { admin: 0, servicos})
})

// Rotas do administrador
router.get('/admin/clientes', (req, res) => {
	res.render('admin/clientes/clientesLista', { admin: 1, clientes })
})

router.get('/admin/cliente/novo', (req, res) => {
	res.render('admin/clientes/clienteNovo', { admin: 1 })
})

router.post('/admin/cliente/salvar', (req, res) => {
	let nome = req.body.iptNome
	let cpf = req.body.iptCpf
	let nascimento = req.body.iptNascimento
	let endereco = req.body.iptEndereco
	let email = req.body.iptEmail
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular

	res.json({
		nome,
		cpf,
		nascimento,
		endereco,
		email,
		telefone,
		celular
	})
})

router.get('/admin/cliente/edit/:id', (req, res) => {
	let id = req.params.id
	let cliente = clientes.filter(cliente => cliente.id == id)[0]
	res.render('admin/clientes/clienteEditar', { admin: 1, cliente})
})

router.get('/admin/cliente/:id', (req, res) => {
	let id = req.params.id
	let cliente = clientes.filter(cliente => cliente.id == id)[0]
	res.render('admin/clientes/clienteInfo', { admin: 1, cliente})
})

module.exports = router