Cypress.Commands.add('cadastrarUsuarioUI', (nome, email, senha) => {
const mensagemEsperada = 'Bem Vindo  Emidio'

  cy.visit('/cadastrarusuarios')
  cy.get('input[name="nome"]').type(nome)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(senha)
  cy.get('input[type="checkbox"]').check()
    .should('be.checked') // Verificação se o checkbox Administrador esta marcado
  cy.get('button[type="submit"]').click()
  // Verificação da mensagem retornada  
  cy.contains('×Cadastro realizado com sucesso').should('be.visible')
  cy.url().should('eq', 'https://front.serverest.dev/admin/home') 
  cy.get('h1').should('have.text', mensagemEsperada)
})

Cypress.Commands.add('cadastrarUsuarioDuplicadoUI', (nome, email, senha) => {
const mensagemEsperada = 'Este email já está sendo usado'

  cy.visit('/cadastrarusuarios')
  cy.get('input[name="nome"]').type(nome)
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(senha)
  cy.get('input[type="checkbox"]').check()
    .should('be.checked')
  cy.get('button[type="submit"]').click()
  // Verificação da mensagem retornada  
  cy.get('.alert > :nth-child(2)').should('have.text', mensagemEsperada)
})

Cypress.Commands.add('loginUI', (email, senha) => {
  cy.visit('/')
  cy.get('input[name="email"]').type(email)
  cy.get('[data-testid="senha"]').type(senha)
  cy.get('[data-testid="entrar"]').click()
  // Verificações
  cy.url().should('eq', 'https://front.serverest.dev/admin/home')
})


Cypress.Commands.add('cadastrarProdutoUI', (produto) => {
  cy.contains('Produtos').click()
  cy.get('input[name="nome"]').type(produto.nome)
  cy.get('[data-testid="preco"]').type(produto.preco.toString())
  cy.get('[data-testid="descricao"]').type(produto.descricao)
  cy.get('[data-testid="quantity"]').type(produto.quantidade.toString())
  cy.get('[data-testid="cadastarProdutos"]').click()
  // Verificações
  cy.url().should('eq', 'https://front.serverest.dev/admin/listarprodutos')
  cy.get('h1').should('have.text', 'Lista dos Produtos')
})

Cypress.Commands.add('criarProdutoApi', (produto) => {
  const token = window.localStorage.getItem('token')
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: { Authorization: token },
    body: produto
  }).then((res) => {
    expect(res.status).to.eq(201)
  })
})