const express = require('express')
const router = express.Router()

// Models
const Tipos = require('../tipos/TiposModel')
const Marcas = require('../marcas/MarcasModel')
const Categorias = require('../categorias/CategoriasModel')
const Produtos = require('../produtos/ProdutosModel')
const Estoques = require('../estoques/EstoquesModel')

// Funções
function isRegistrosValidos(inteiros = [], strings = []) {
	let inteirosValidos = true
	let stringsValidas = true
	inteiros.forEach(valor => {
		if (!valor || isNaN(valor)) {
			inteirosValidos = false
		}
	})
	strings.forEach(valor => {
		if (!valor) {
			stringsValidas = false
		}
	})
	return inteirosValidos && stringsValidas
}

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
	Produtos.findAll({
		include: [
			{ model: Estoques },
			{ model: Marcas },
			{ model: Categorias },
			{ model: Tipos }
		]
	}).then(produtos => {
		res.render('admin/produtos/produtosLista', { admin: 1, produtos })
	})
})

router.get('/admin/produto/novo', (req, res) => {
	Categorias.findAll({ raw: true }).then(categorias => {
		Marcas.findAll({ raw: true }).then(marcas => {
			Tipos.findAll({ raw: true }).then(tipos => {
				res.render('admin/produtos/produtoCadastrar', { admin: 1, categorias, marcas, tipos })
			})
		})
	})
})

router.post('/admin/produto/salvar', (req, res) => {
	let categoria = Number.parseInt(req.body.sltCategoria)
	let tipo = Number.parseInt(req.body.sltTipo)
	let marca = Number.parseInt(req.body.sltMarca)
	let modelo = req.body.iptModelo
	let fabricacao = Number.parseInt(req.body.iptFabricacao)
	let garantiaLoja = Number.parseInt(req.body.iptGarantiaLoja)
	let garantiaFabricante = Number.parseInt(req.body.iptGarantiaFabricante)
	let descricao = req.body.textDescricao
	let estoque = Number.parseInt(req.body.iptEstoque)
	let preco = Number.parseFloat(req.body.iptPreco)

	Produtos.create({
		modelo,
		tipoId: tipo,
		categoriaId: categoria,
		marcaId: marca,
		descricao,
		anoFabricacao: fabricacao,
		garantiaLoja,
		garantiaFabricante,
		preco,
		estoqueProdutoId: estoque
	}).then(resultado => {
		Estoques.create({
			produtoId: resultado.dataValues.id,
			estoque
		})
		res.redirect('/admin/produtos')
	})
})

router.get('/admin/produto/:id', (req, res) => {
	let id = req.params.id
	Produtos.findByPk(id, {
		include: [
			{ model: Estoques },
			{ model: Marcas },
			{ model: Categorias },
			{ model: Tipos }
		]
	}).then(produto => {
		res.render('admin/produtos/produtoInfo', { admin: 1, produto })
	})
})

router.get('/admin/produto/edit/:id', (req, res) => {
	let id = req.params.id
	Produtos.findByPk(id, {
		include: [{
			model: Estoques
		}]
	}).then(produto => {
		Categorias.findAll({ raw: true }).then(categorias => {
			Marcas.findAll({ raw: true }).then(marcas => {
				Tipos.findAll({ raw: true }).then(tipos => {
					res.render('admin/produtos/produtoEditar', { admin: 1, produto, categorias, marcas, tipos })
				})
			})
		})
	})
})

router.post('/admin/produto/atualizar', (req, res) => {
	let id = req.body.iptId
	let categoria = Number.parseInt(req.body.sltCategoria)
	let tipo = Number.parseInt(req.body.sltTipo)
	let marca = Number.parseInt(req.body.sltMarca)
	let modelo = req.body.iptModelo
	let fabricacao = Number.parseInt(req.body.iptFabricacao)
	let garantiaLoja = Number.parseInt(req.body.iptGarantiaLoja)
	let garantiaFabricante = Number.parseInt(req.body.iptGarantiaFabricante)
	let descricao = req.body.textDescricao
	let estoque = Number.parseInt(req.body.iptEstoque)
	let preco = Number.parseFloat(req.body.iptPreco)

	Produtos.update({
		modelo,
		tipoId: tipo,
		categoriaId: categoria,
		marcaId: marca,
		descricao,
		anoFabricacao: fabricacao,
		garantiaLoja,
		garantiaFabricante,
		preco,
		estoqueProdutoId: estoque
	}, {
		where: {
			id: id
		}
	}).then(resultado => {
		Estoques.update({
			estoque
		}, {
			where: {
				produtoId: id
			}
		})
		res.redirect('/admin/produtos')
	})
})

router.get('/admin/produtos/opcoes', (req, res) => {
	Tipos.findAll({ raw: true }).then(tipos => {
		Marcas.findAll({ raw: true }).then(marcas => {
			Categorias.findAll({ raw: true }).then(categorias => {
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

router.post('/admin/produto/deletar', (req, res) => {
	let id = req.body.produtoId
	Produtos.destroy({
		where: {id}
	}).then(() => {
		res.redirect('/admin/produtos')
	})
})

module.exports = router
