const express = require('express')
const session = require('express-session')
const app = express(express)

// Configuração da conexão com o banco de dados
const connection = require('./database/database')
connection.authenticate()
	.then(() => {
		console.log('Conexão com o Banco de dados realizada com sucesso.')
	})
	.catch(erro => {
		console.log(erro)
	})

// Configurações do Express
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
	secret: 'poenwlqidlsiwnl',
	cookie: {
		maxAge: 86400000 // 1 dia
	}
}))

// Controllers
const produtosController = require('./produtos/produtosController')
const servicosController = require('./servicos/servicosController')
const funcionariosController = require('./funcionarios/funcionariosController')
const clientesController = require('./clientes/clientesController')
const newslettersController = require('./newsletter/newslettersController')

// Configurações dos Controllers
app.use('/', produtosController)
app.use('/', servicosController)
app.use('/', funcionariosController)
app.use('/', clientesController)
app.use('/', newslettersController)

// Models para Produto
const Tipos = require('./tipos/TiposModel')
const Marcas = require('./marcas/MarcasModel')
const Estoques = require('./estoques/EstoquesModel')
const Categorias = require('./categorias/CategoriasModel')
const Produtos = require('./produtos/ProdutosModel')

// Models para Serviço
const Cargos = require('./cargos/CargosModel')
const Setores = require('./setores/SetoresModel')
const Funcionarios = require('./funcionarios/FuncionariosModel')
const Servicos = require('./servicos/ServicosModel')

// Model de Serviços x Funcionarios
const ServicosFuncionarios = require('./servicos_funcionarios/ServicosFuncionariosModel')

// Model de Clientes
const Clientes = require('./clientes/ClientesModel')
const LoginClientes = require('./login_clientes/LoginClientesModel')

// Model de Newsletters
const Newsletter = require('./newsletter/NewslettersModel')

app.get('/', (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	res.render('index', { isLogado })
})

app.get('/contato', (req, res) => {
	res.render('contatos')
})

app.listen(8080, error => {
	if (error) {
		console.log(error)
	} else {
		console.log('Servidor rodando...')
	}
})
