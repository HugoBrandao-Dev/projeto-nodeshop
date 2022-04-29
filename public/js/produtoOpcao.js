const rdOpcoes = document.getElementsByName('rdOpcao')
const sectionsSecoes = document.querySelectorAll('section')

function getSection(value) {
	let secoes = [...sectionsSecoes]
	secoes.map(secao => secao.style.display = 'none')
	return secoes.filter(secao => secao.id == value)[0]
}

rdOpcoes.forEach(radio => {
	radio.onchange = function() {
		console.log(radio.value)
		let secao = getSection(radio.value)
		secao.style.display = 'block'
	}
})
