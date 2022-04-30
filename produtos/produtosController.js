const express = require('express')
const router = express.Router()

// Models
const Tipos = require('../tipos/TiposModel')
const Marcas = require('../marcas/MarcasModel')
const Categorias = require('../categorias/CategoriasModel')

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
	Categorias.findAll({ raw: true })
		.then(categorias => {
			Marcas.findAll({ raw: true })
				.then(marcas => {
					Tipos.findAll({ raw: true })
						.then(tipos => {
							res.render('admin/produtos/produtoCadastrar', { admin: 1, categorias, marcas, tipos })
						})
				})
		})
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
	res.redirect('/admin/produtos')
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
	Tipos.findAll().then(tipos => {
		Marcas.findAll().then(marcas => {
			Categorias.findAll().then(categorias => {
				res.render('admin/produtos/produtoOpcao', { admin: 1, tipos, marcas, categorias })
			})
		})
	})
})

router.post('/admin/produtos/opcoes/salvar/tipo', (req, res) => {
	let tipo = req.body.iptTipo
	if (tipo && isNaN(tipo)) {
		let tipoFormatado = tipo.trim().toLowerCase()
		Tipos.create({ tipo: tipoFormatado })
		.then(() => {
			res.redirect('/admin/produtos/opcoes')
		})
		.catch(erro => {
			res.send(erro)
		})
	} else {
		res.send('Tipo inválidos.')
	}
})

router.post('/admin/produtos/opcoes/salvar/categoria', (req, res) => {
	let categoria = req.body.iptCategoria
	if (categoria && isNaN(categoria)) {
		let categoriaFormatada = categoria.trim().toLowerCase()
		Categorias.create({ categoria: categoriaFormatada })
			.then(() => {
				res.redirect('/admin/produtos/opcoes')
			})
			.catch(erro => {
				res.send(erro)
			})
	} else {
		res.send('Categoria inválidos.')
	}
})

router.post('/admin/produtos/opcoes/salvar/marca', (req, res) => {
	let marca = req.body.iptMarca
	if (marca && isNaN(marca)) {
		let marcaFormatada = marca.trim().toLowerCase()
		Marcas.create({ marca: marcaFormatada })
		.then(() => {
			res.redirect('/admin/produtos/opcoes')
		})
		.catch(erro => {
			res.send(erro)
		})
	} else {
		res.send('Marca inválidos.')
	}
})

module.exports = router
