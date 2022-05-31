const express = require('express')
const router = express.Router()

// Models
const Newsletters = require('./NewslettersModel')

router.post('/newsletter/cadastrar', (req, res) => {
	let nome = req.body.iptNome
	let email = req.body.iptEmail

	Newsletters.create({
		nome,
		email
	})
	res.redirect('/')
})

module.exports = router