const express = require('express')
const app = express(express)

// Controllers
const produtosController = require('./produtos/produtosController')

// Configurações do Express
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Configurações dos Controllers
app.use('/', produtosController)

app.get('/', (req, res) => {
	res.render('index', {admin: 0})
})

app.listen(8080, error => {
	if (error) {
		console.log(error)
	} else {
		console.log('Servidor rodando...')
	}
})