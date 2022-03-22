const express = require('express')
const router = express.Router()

router.get('/admin/produtos', (req, res) => {
	res.render('admin/produtos/produtosLista', { admin: 1 })
})

router.get('/admin/produto/novo', (req, res) => {
	res.render('admin/produtos/produtoCadastrar', { admin: 1 })
})

router.post('/admin/produto/salvar', (req, res) => {
	let marca = req.body.iptMarca
	let produto = req.body.iptProduto
	let fabricacao = req.body.iptFabricacao
	let garantiaLoja = req.body.iptGarantiaLoja
	let garantiaFabricante = req.body.iptGarantiaFabricante
	let categoria = req.body.sltCategoria
	let estoque = req.body.iptEstoque
	res.json({
		marca,
		produto,
		fabricacao,
		garantiaLoja,
		garantiaFabricante,
		categoria,
		estoque
	})
})

module.exports = router