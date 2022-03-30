// Comportamento dos botões e da seções Tipo e Marca

const btnTipo = document.getElementById('btnTipo')
const btnMarca = document.getElementById('btnMarca')
const sectionTipo = document.getElementById('tipo')
const sectionMarca = document.getElementById('marca')

function ativar(ativarElemento, desativarElemento) {
	ativarElemento.style.color = '#fff'
	ativarElemento.style.backgroundColor = 'rgb(79, 161, 216)'
	desativarElemento.style.color = '#000'
	desativarElemento.style.backgroundColor = 'rgb(239, 239, 239)'
}

btnTipo.onclick = function () {
	sectionMarca.style.display = 'none'
	sectionTipo.style.display = 'block'
	ativar(btnTipo, btnMarca)
}

btnMarca.onclick = function () {
	sectionMarca.style.display = 'block'
	sectionTipo.style.display = 'none'
	ativar(btnMarca, btnTipo)
}