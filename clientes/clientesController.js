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

router.post('/cliente/deletar', (req, res) => {
	let id = req.body.iptId
	Clientes.destroy({
		where: {
			id
		}
	}).then(() => {
		res.redirect('/')
	})
})

router.get('/cliente/novo', (req, res) => {
	res.render('cadastrar', { admin: 0, dataMaxima: getDataMaxima() })
})

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
	Clientes.findByPk(id)
		.then(cliente => {
			res.render('admin/clientes/clienteInfo', { admin: 1, cliente })
		})
})

module.exports = router