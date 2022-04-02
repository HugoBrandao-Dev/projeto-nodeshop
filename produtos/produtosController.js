const express = require('express')
const router = express.Router()

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

let tipos = [
	{
		id: 0,
		tipo: 'notebook'
	},
	{
		id: 1,
		tipo: 'geladeira'
	},
	{
		id: 2,
		tipo: 'panela de presssão'
	}
]

let marcas = [
	{
		id: 0,
		marca: 'Dell'
	},
	{
		id: 1,
		marca: 'HP'
	},
	{
		id: 2,
		marca: 'Eletrolux'
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

// Rotas do Administrador

router.get('/admin/produtos', (req, res) => {

	res.render('admin/produtos/produtosLista', { admin: 1, produtos })
})

router.get('/admin/produto/novo', (req, res) => {
	res.render('admin/produtos/produtoCadastrar', { admin: 1 })
})

router.post('/admin/produto/salvar', (req, res) => {
	let categoria = Number.parseInt(req.body.sltCategoria.value)
	let tipo = Number.parseInt(req.body.sltTipo.value)
	let marca = Number.parseInt(req.body.iptMarca)
	let modelo = req.body.iptModelo
	let fabricacao = Number.parseInt(req.body.iptFabricacao)
	let garantiaLoja = Number.parseInt(req.body.iptGarantiaLoja)
	let garantiaFabricante = Number.parseInt(req.body.iptGarantiaFabricante)
	let descricao = req.body.textDescricao
	let estoque = Number.parseInt(req.body.iptEstoque)
	let preco = Number.parseFloat(parseFloat(req.body.iptPreco.replace(',', '.')).toFixed(2))

	produtos.push({
		categoria,
		tipo,
		marca,
		modelo,
		fabricacao,
		garantiaLoja,
		garantiaFabricante,
		descricao,
		estoque,
		preco
	})
	res.redirect('/admin/produtos', { admin: 1 })
})

router.get('/admin/produto/:id', (req, res) => {
	let id = req.params.id
	let produto = produtos.filter(produto => produto.id == id)[0]
	res.render('admin/produtos/produtoInfo', { admin: 1, produto })
})

router.get('/admin/produto/edit/:id', (req, res) => {
	let id = req.params.id
	let produto = produtos.filter(produto => produto.id == id)[0]
	res.render('admin/produtos/produtoEditar', { admin: 1, produto })
})

router.post('/admin/produto/atualizar/:id', (req, res) => {
	let categoria = Number.parseInt(req.body.sltCategoria.value)
	let tipo = Number.parseInt(req.body.sltTipo.value)
	let marca = Number.parseInt(req.body.iptMarca)
	let modelo = req.body.iptModelo
	let fabricacao = Number.parseInt(req.body.iptFabricacao)
	let garantiaLoja = Number.parseInt(req.body.iptGarantiaLoja)
	let garantiaFabricante = Number.parseInt(req.body.iptGarantiaFabricante)
	let descricao = req.body.textDescricao
	let estoque = Number.parseInt(req.body.iptEstoque)
	let preco = Number.parseFloat(parseFloat(req.body.iptPreco.replace(',', '.')).toFixed(2))

	res.json({
		categoria,
		tipo,
		marca,
		modelo,
		fabricacao,
		garantiaLoja,
		garantiaFabricante,
		descricao,
		estoque,
		preco
	})
})

router.get('/admin/produtos/opcoes', (req, res) => {
	res.render('admin/produtos/produtoOpcao', { admin: 1, tipos, marcas})
})

router.post('/admin/produtos/opcoes/salvar/tipo', (req, res) => {
	let nome = req.body.iptNome
	res.json({ nome })
})

router.post('/admin/produtos/opcoes/salvar/marca', (req, res) => {
	let nome = req.body.iptNome
	res.json({ nome })
})

module.exports = router