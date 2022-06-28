const express = require('express')
const router = express.Router()
const usuarioAuth = require('../middlewares/usuarioAuth')

// Models
const ProdutosVendidos = require('../produtos_vendidos/ProdutosVendidosModel')
const Estoques = require('../estoques/EstoquesModel')
const Produtos = require('../produtos/ProdutosModel')
const Compras = require('../compras/ComprasModel')

function getDataAtual() {
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
	return `${ dia }-${ mes() }-${ ano }`
}

router.get('/compra/:id', (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	let idsProdutos = req.session.usuario.produtosCompra.map(item => parseInt(item.id))
	Produtos.findAll({
		attributes: ['id', 'modelo', 'preco'], // Campos a serem retornados
		where: {
			id: idsProdutos
		},
		raw: true
	}).then(produtosBanco => {
		let produtosSessao = [...req.session.usuario.produtosCompra]
		produtosBanco.total = 0

		// Adicionada a chave 'quantidade' ao array de produtosBanco (array final).
		produtosBanco.forEach(produtoBanco => {
			produtosSessao.forEach(produtoSessao => {
				if (produtoSessao.id == produtoBanco.id) {
					produtoBanco.quantidade = produtoSessao.quantidade
					produtoBanco.total = parseFloat(produtoBanco.quantidade) * parseFloat(produtoBanco.preco)
					produtosBanco.total += produtoBanco.total
				}
			})
		})
		produtosBanco.data = "Atual"
		res.render('compra_detalhada', { isLogado, produtos: produtosBanco })
	})
})

router.get('/compras', usuarioAuth, (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	res.render('compras', { isLogado, compraAtual: req.session.usuario.produtosCompra, dataAtual: getDataAtual() })
})

router.post('/comprar', (req, res) => {
	let isLogado = false

	if (req.session.usuario) {
		isLogado = true
	}
	if (req.session.usuario) {
		let produto = {
			id: req.body.iptId,
			quantidade: req.body.iptQuantidade
		}
		req.session.usuario.produtosCompra.push(produto)
		res.redirect('/compras')
	} else {
		res.send('Faça o login para comprar o produto.')
	}
})

router.post('/finalizarCompra', (req, res) => {
	let isProdutosComEstoques = true
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}

	// Verifica se cada produto tem estoque.
	req.session.usuario.produtosCompra.map(item => {
		Estoques.findOne({
			produtoId: item.id
		}).then(produto => {
			if (produto.estoque - item.quantidade < 0) {
				isProdutosComEstoques = false
			}
		})
	})

	if (isProdutosComEstoques) {
		let produtosSessao = [...req.session.usuario.produtosCompra]
		let clienteId = req.session.usuario.id

		let idsProdutos = req.session.usuario.produtosCompra.map(item => parseInt(item.id))
		Produtos.findAll({
			attributes: ['id', 'preco'],
			where: {
				id: idsProdutos
			},
			raw: true
		}).then(resultado => {
			let total = 0
			produtosSessao.forEach(produtoSessao => {
				resultado.forEach(produtoBanco => {
					if (parseInt(produtoSessao.id) == parseInt(produtoBanco.id)) {
						let preco = parseFloat(produtoBanco.preco)
						let quantidade = parseInt(produtoSessao.quantidade)
						total += preco * quantidade
					}
				})
			})
			Compras.create({
				total,
				clienteId
			}).then(registro => {
				req.session.usuario.produtosCompra.map(item => {
					ProdutosVendidos.create({
						quantidade: item.quantidade,
						produtoId: item.id,
						compraId: registro.dataValues.id,
					})
				})
				req.session.usuario.produtosCompra = []
				res.redirect('/compras')
			})
		})
	} else {
		res.redirect('/compras')
	}
})

module.exports = router
