function isSair(event, form) {
	event.preventDefault()
	if (confirm('Deseja sair?')) {
		form.submit()
	}
}