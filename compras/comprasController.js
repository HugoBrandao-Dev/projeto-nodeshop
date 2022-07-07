const express = require('express')
const router = express.Router()
const usuarioAuth = require('../middlewares/usuarioAuth')
const Sequelize = require('sequelize')

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
	let dia = () => {
		if (data.getDate() < 10) {
			return `0${ data.getDate() }`
		}
	}
	return `${ dia() }-${ mes() }-${ ano }`
}

router.get('/compra/:id', (req, res) => {
	let isLogado = false
	let id = req.params.id
	if (req.session.usuario) {
		isLogado = true
	}

	// Para caso o parâmetro seja "atual"
	if (isNaN(id)) {
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

			console.log(produtosBanco)
			produtosBanco.data = "Atual"
			res.render('compra_detalhada', { isLogado, produtos: produtosBanco })
		})
	} else {
		Compras.findByPk(id, {
			include: [
				{ model: Produtos }
			]
		}).then(comprasProdutos => {
			let produtos = []
			produtos.total = 0

			comprasProdutos.produtos.forEach(produto => {
				produtos.push({
					id: produto.id,
					modelo: produto.modelo,
					preco: produto.preco,
					quantidade: produto.produtos_vendidos.quantidade,
					total: parseInt(produto.produtos_vendidos.quantidade) * parseFloat(produto.preco)
				})
				produtos.total += parseInt(produto.produtos_vendidos.quantidade) * parseFloat(produto.preco)
			})

			produtos.data = comprasProdutos.createdAt
			res.render('compra_detalhada', { isLogado, produtos })
		})
	}
})

router.get('/compras', usuarioAuth, (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	Compras.findAll({
		where: {
			clienteId: req.session.usuario.id,
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
		res.render('compras', {
			isLogado,
			compraAtual: req.session.usuario.produtosCompra,
			dataAtual: getDataAtual(),
			historicoCompras
		})
	})
})

router.post('/comprar', (req, res) => {
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
			} else {
				Estoques.update({
					estoque: parseInt(produto.estoque - item.quantidade)
				}, {
					where: {
						produtoId: item.id
					}
				}).then(() => {
					console.log('Estoques atualizados com sucesso.')
				})
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

router.get('/cancelarCompra', (req, res) => {
	req.session.usuario.produtosCompra = []
	res.redirect('/compras')
})

module.exports = router
