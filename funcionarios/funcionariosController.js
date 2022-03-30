const express = require('express')
const router = express.Router()

let funcionarios = [
	{
		id: 0,
		nome: 'Tobias de Oliveira',
		cpf: '111.111.111-11',
		nascimento: '30/01/1992',
		endereço: 'Bairro: Oliveira I, Rua: Tobias de Oliveira, N: 100',
		email: 'tobias@gmail.com',
		telefone: '5511111111111',
		celular: '5511111111112',
		setor: 'Atendimento',
		cargo: 'Atendente'
	},
	{
		id: 1,
		nome: 'Dinorá de Oliveira',
		cpf: '222.222.222-2',
		nascimento: '15/02/1993',
		endereço: 'Bairro: Oliveira IV, Rua: Dinorá de Oliveira, N: 300',
		email: 'dinora_oliveira@gmail.com',
		telefone: '5522222222222',
		celular: '5522222222223',
		setor: 'Assitência técnica',
		cargo: 'Técnico(a) assistente'
	},
	{
		id: 2,
		nome: 'Josias Cruz',
		cpf: '333.333.333-3',
		nascimento: '04/06/1995',
		endereço: 'Bairro: Cruz III, Rua: Josias Cruz, N: 500',
		email: 'josias_cruz@hotmail.com',
		telefone: '5533333333333',
		celular: '5533333333334',
		setor: 'Assitência técnica',
		cargo: 'Técnico(a) assistente'
	},
	{
		id: 3,
		nome: 'Doralice Cruz',
		cpf: '444.444.444-4',
		nascimento: '20/10/1990',
		endereço: 'Bairro: Cruz II, Rua: Doralice Cruz, N: 1000',
		email: 'dora_cruz@hotmail.com',
		telefone: '5544444444444',
		celular: '5544444444445',
		setor: 'Gerência',
		cargo: 'Gerente'
	}
]

router.get('/admin/funcionarios', (req, res) => {
	res.render('admin/funcionarios/funcionariosLista', { admin: 1, funcionarios })
})

module.exports = router