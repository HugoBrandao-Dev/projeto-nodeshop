const express = require('express')
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

// Controllers
const produtosController = require('./produtos/produtosController')
const servicosController = require('./servicos/servicosController')
const funcionariosController = require('./funcionarios/funcionariosController')
const clientesController = require('./clientes/clientesController')

// Configurações dos Controllers
app.use('/', produtosController)
app.use('/', servicosController)
app.use('/', funcionariosController)
app.use('/', clientesController)

// Models
const Tipos = require('./tipos/TiposModel')
const Marcas = require('./marcas/MarcasModel')

app.get('/', (req, res) => {
	res.render('index', {admin: 0})
})

app.get('/contato', (req, res) => {
	res.render('contatos', { admin: 0 })
})

app.listen(8080, error => {
	if (error) {
		console.log(error)
	} else {
		console.log('Servidor rodando...')
	}
})
