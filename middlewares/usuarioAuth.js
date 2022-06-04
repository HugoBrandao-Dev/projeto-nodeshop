function usuarioAuth(req, res, next) {
	if (req.session.admin >= 0) {
		next()
	} else {
		res.redirect('/')
	}
}

module.exports = usuarioAuth