const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// Models
const Clientes = require('./ClientesModel')
const Compras = require('../compras/ComprasModel')
const Produtos = require('../produtos/ProdutosModel')
const LoginClientes = require('../login_clientes/LoginClientesModel')
const usuarioAuth = require('../middlewares/usuarioAuth')

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

router.post('/cliente/deletar', usuarioAuth, (req, res) => {
	let id = req.body.iptId
	LoginClientes.destroy({
		where: {
			clienteId: id
		}
	}).then(() => {
		Clientes.destroy({
			where: {
				id
			}
		}).then(() => {
			if (req.session.usuario) {
				req.session.usuario = undefined
				res.redirect('/')
			} else {
				res.redirect('/admin/clientes')
			}
		})
	})
})

router.get('/cliente/novo', (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	res.render('cadastrar', { dataMaxima: getDataMaxima(), isLogado })
})

router.post('/cliente/salvar', (req, res) => {
	let nome = req.body.iptNome
	let cpf = req.body.iptCpf
	let nascimento = req.body.iptNascimento
	let endereco = req.body.iptEndereco
	let informacoes = req.body.iptInformacoes
	let email = req.body.iptEmail
	let senha = req.body.iptSenha
	let senhaNovamente = req.body.iptSenhaNovamente
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular

	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(senha, salt)

	Clientes.create({
		nome,
		cpf,
		nascimento,
		endereco,
		informacoesAdicionais: informacoes,
		telefone,
		celular
	}).then(cliente => {
		LoginClientes.create({
			email,
			senha: hash,
			clienteId: cliente.dataValues.id
		}).then(() => {
			res.redirect('/')
		})
	})
})

router.post('/cliente/atualizar', usuarioAuth, (req, res) => {
	let isLogado = req.session.usuario ? true : false
	let id = req.body.iptId
	let nome = req.body.iptNome
	let cpf = req.body.iptCpf
	let nascimento = req.body.iptNascimento
	let endereco = req.body.iptEndereco
	let informacoes = req.body.iptInformacoes
	let email = req.body.iptEmail
	let senhaAntiga = req.body.iptSenhaAntiga
	let senha = req.body.iptSenha
	let senhaNovamente = req.body.iptSenhaNovamente
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular

	let infoCliente = {}
	let infoLoginCliente = {}

	// Informações que irão para a tabela de clientes
	infoCliente.nome = nome
	infoCliente.cpf = cpf
	infoCliente.nascimento = nascimento
	infoCliente.endereco = endereco
	infoCliente.informacoesAdicionais = informacoes
	infoCliente.telefone = telefone
	infoCliente.celular = celular

	// Informações que irão para a tabela de login_clientes
	infoLoginCliente.email = email

	/*
	Só serão feitas as atualizar se o usuário informar a senha, independente de
	quais informações foram atualizadas ou não
	*/
	if (senhaAntiga && senha && senhaNovamente) {
		LoginClientes.findOne({
			where: {
				clienteId: id
			}
		}).then(cliente => {
			let isIguais = bcrypt.compareSync(senhaAntiga, cliente.senha)
			if(isIguais) {
				let salt = bcrypt.genSaltSync(10)
				let hash = bcrypt.hashSync(senha, salt)

				infoLoginCliente.senha = hash

				Clientes.update(infoCliente, {
					where: {
						id
					}
				}).then(() => {
					LoginClientes.update(infoLoginCliente, {
						where: {
							clienteId: id
						}
					}).then(() => {
						req.session.usuario = {
							id,
							nome,
							email,
							cpf,
							nascimento,
							endereco,
							informacoes,
							telefone,
							celular,
							produtosCompra: []
						}
						res.redirect('/cliente')
					})
				})
			} else {
				res.send('A senha informada é inválida.')
			}
		})
	} else {
		if (isLogado) {
			res.redirect('/cliente')
		} else {
			res.redirect('/admin/clientes')
		}
	}
})

router.post('/cliente/login', (req, res) => {
	let email = req.body.iptEmail
	let senha = req.body.iptSenha

	LoginClientes.findOne({
		include: [
		{ model: Clientes }
		],
		where: {
			email
		}
	}).then(usuario => {
		if(bcrypt.compareSync(senha, usuario.senha)) {
			req.session.usuario = {
				id: usuario.cliente.id,
				nome: usuario.cliente.nome,
				email: usuario.email,
				cpf: usuario.cliente.cpf,
				nascimento: usuario.cliente.nascimento,
				endereco: usuario.cliente.endereco,
				informacoes: usuario.cliente.informacoesAdicionais,
				telefone: usuario.cliente.telefone,
				celular: usuario.cliente.celular,
				produtosCompra: []
			}
			res.redirect('/')
		} else {
			res.send('Senha inválida.')
		}
	}).catch(erro => {
		console.log(erro)
		res.send('Nenhum usuário encontrado.')
	})
})

router.get('/logout', (req, res) => {
	req.session.usuario = undefined
	res.redirect('/')
})

router.get('/cliente', usuarioAuth, (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	Clientes.findByPk(req.session.usuario.id, {
		include: [
		{ model: LoginClientes }
		]
	}).then(cliente => {
		res.render('painel_controle', { cliente, isLogado })
	})
})

router.get('/cliente/editar', (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	Clientes.findByPk(req.session.usuario.id, {
		include: [
		{ model: LoginClientes }
		]
	})
	.then(cliente => {
		res.render('atualizar', { cliente, isLogado })
	})
})

// Rotas do administrador
router.get('/admin/clientes', (req, res) => {
	Clientes.findAll({
		include: [
		{ model: LoginClientes }
		]
	}).then(clientes => {
		res.render('admin/clientes/clientesLista', { clientes })
	})
})

router.get('/admin/cliente/novo', (req, res) => {
	res.render('admin/clientes/clienteNovo', { dataMaxima: getDataMaxima() })
})

router.get('/admin/cliente/editar/:id', (req, res) => {
	let id = req.params.id
	Clientes.findByPk(id, {
		include: [
		{ model: LoginClientes }
		]
	})
	.then(cliente => {
		res.render('admin/clientes/clienteEditar', { cliente })
	})
})

router.get('/admin/cliente/:id', (req, res) => {
	let id = req.params.id
	Clientes.findByPk(id, {
		include: [
		{ model: LoginClientes }
		]
	})
	.then(cliente => {
		Compras.findAll({
			where: {
				clienteId: req.params.id,
			},
			include: [
			{
				model:  Produtos
			}
			],
			order: [
			['id', 'DESC']
			],
		}).then(historicoCompras => {
			res.render('admin/clientes/clienteInfo', {
				historicoCompras,
				cliente
			})
		})
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
	let senhaAntiga = req.body.iptSenhaAntiga
	let senha = req.body.iptSenha
	let senhaNovamente = req.body.iptSenhaNovamente
	let telefone = req.body.iptTelefone
	let celular = req.body.iptCelular

	let infoCliente = {}
	let infoLoginCliente = {}

	// Informações que irão para a tabela de clientes
	infoCliente.nome = nome
	infoCliente.cpf = cpf
	infoCliente.nascimento = nascimento
	infoCliente.endereco = endereco
	infoCliente.informacoesAdicionais = informacoes
	infoCliente.telefone = telefone
	infoCliente.celular = celular

	// Informações que irão para a tabela de login_clientes
	infoLoginCliente.email = email

	/*
	Só serão feitas as atualizar se o usuário informar a senha, independente de
	quais informações foram atualizadas ou não
	*/
	if (senha && senhaNovamente) {
		Clientes.update(infoCliente, {
			where: {
				id
			}
		}).then(() => {
			let salt = bcrypt.genSaltSync(10)
			let hash = bcrypt.hashSync(senha, salt)

			infoLoginCliente.senha = hash

			LoginClientes.update(infoLoginCliente, {
				where: {
					clienteId: id
				}
			}).then(() => {
				res.redirect('/admin/clientes')
			})
		})
	}
})

module.exports = router
