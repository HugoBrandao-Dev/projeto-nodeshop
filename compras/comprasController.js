const express = require('express')
const router = express.Router()

router.get('/compras', (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	res.render('compras', { isLogado })
})

router.post('/comprar', (req, res) => {
	if (req.session.usuario) {
		let produto = {
			id: req.body.iptId,
			quantidade: req.body.iptQuantidade
		}
		res.send(produto)
	} else {
		res.send('Faça o login para comprar o produto.')
	}
})

module.exports = router
