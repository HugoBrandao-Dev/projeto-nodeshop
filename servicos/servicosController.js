const express = require('express')
const router = express.Router()

let servicos = [
	{
		id: 0,
		servico: 'Manutenção em redes de computadores',
		responsaveis: ['Tobias de Oliveira'],
		descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime neque quis eos sint, tempore delectus tenetur pariatur? Ad similique nobis eaque quibusdam corporis architecto veritatis placeat, dolor deleniti quaerat mollitia.'
	},
	{
		id: 1,
		servico: 'Manutenção em banco de dados',
		responsaveis: ['Tobias de Oliveira', 'Dinorá de Oliveira'],
		descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime neque quis eos sint, tempore delectus tenetur pariatur? Ad similique nobis eaque quibusdam corporis architecto veritatis placeat, dolor deleniti quaerat mollitia.'
	},
	{
		id: 2,
		servico: 'Manutenção em computadores',
		responsaveis: ['Josias Cruz', 'Doralice Cruz'],
		descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime neque quis eos sint, tempore delectus tenetur pariatur? Ad similique nobis eaque quibusdam corporis architecto veritatis placeat, dolor deleniti quaerat mollitia.'
	}
]

// Rotas do Administrador
router.get('/admin/servicos', (req, res) => {
	res.render('admin/servicos/servicosLista', { admin: 1, servicos})
})

router.get('/admin/servico/edit/:id', (req, res) => {
	let id = req.params.id
	let servico = servicos.filter(servico => servico.id == id)[0]
	res.render('admin/servicos/servicoEditar', { admin: 1, servico })
})

router.get('/admin/servico/novo', (req, res) => {
	res.render('admin/servicos/servicoCadastrar', { admin: 1 })
})

router.post('/admin/servico/salvar', (req, res) => {
	let servico = req.body.iptServico
	let responsaveis = req.body.iptResponsaveis
	let descricao = req.body.textDescricao

	res.json({
		servico,
		responsaveis,
		descricao
	})
})

router.get('/admin/servico/:id', (req, res) => {
	let id = req.params.id
	let servico = servicos.filter(servico => servico.id == id)[0]
	res.render('admin/servicos/servicoInfo', { admin: 1, servico })
})

module.exports = router