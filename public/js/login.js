const btnLogin = document.querySelector('button#btn-login')
btnLogin.addEventListener('click', acaoLogin)

const formLogin = document.querySelector('form#form-login')

function acaoLogin() {
	if (formLogin.style.display !== 'block') {
		formLogin.style.display = 'block'
	} else {
		formLogin.style.display = 'none'
	}
}