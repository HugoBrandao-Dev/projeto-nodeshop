const btnLogin = document.querySelector('button#btn-login')
btnLogin.addEventListener('click', mostrarFormularioLogin)

const formLogin = document.querySelector('form#form-login')

function mostrarFormularioLogin() {
	if (formLogin.style.display !== 'block') {
		formLogin.style.display = 'block'
	} else {
		formLogin.style.display = 'none'
	}
}