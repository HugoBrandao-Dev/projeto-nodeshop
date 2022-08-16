# Descrição
Projeto de __portifólio__, criado com base em outro projeto de front-end,
desenvolvido no curso de __HTML5 e CSS3 na prática__ da plataforma Node Studio
Treinamentos.

[Projeto front-end original](https://github.com/HugoBrandao-Dev/html5-e-css3-na-pratica-node-studios)

O presente projeto representa uma empresa __fictícia__ de venda de produtos
eletrônicos e serviços de TI.

## Objetivo
Tem por finalidades testar minhas habilidades com  as tecnologias de
desenvolvimento back-end.

## Tecnologias empregadas
### Framework(s)
* Express JS: Criação de rotas que atenderão as requisições.

### Biblioteca(s)
* Sequelize: Para a comunicação entre a aplicação e o banco de dados MySQL.

### Banco de dados
* MySQL: Para armazenamento de dados.

### Outra(s)
* Node.js: Para uso de JavaScript.
* NPM: Para gerenciamento de pacotes.
* EJS: Template engine, para geração de HTML utilizando JavaScript

# Possíveis melhorias futuras
* Fazer ligação entre a tabela Tipos e Categorias dos produtos;
* Corrigir o redirecionamento da seção, após o cadastro de uma nova opção de
produto;
* Adicionar botão de deleção de opções cadastradas de produtos, bem como sua
lógica de back-end (evitar a deleção de um tipo que pertence a um produto
cadastrado, por exemplo);
* Algumas rotas ficaram sem validadores de inserção de dados;
* Criar sistema de busca por nome para a seção de produtos e clientes, tanto para a área admin quanto para área do cliente.
* Criar mecanismo que impeça clientes menores de 18 anos de se cadastrarem ou de serem cadastrados (pela area adm).
* Criar uma ou mais views de captura de eventuais error que possam acontecer em processos feitos pelo adm ou pelo cliente.
* Remover/corrigir a necessidade de senha (atual e nova) para a alteração de dados do cliente (pelo cliente e admin).
* Adicionar informação sobre o estoque do produto na tela de detalhamento do mesmo. Além disso, ter o estoque como limite de quantidade na escolha do produto na view.
* Adicionar o cargo ocupado pelo funcionário ao lado de seu nome, na view de cadastro de um novo serviço.
