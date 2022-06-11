const express = require('express')
const router = express.Router()

router.get('/compras', (req, res) => {
	let isLogado = false
	if (req.session.usuario) {
		isLogado = true
	}
	res.render('compras', { isLogado })
})

module.exports = router
