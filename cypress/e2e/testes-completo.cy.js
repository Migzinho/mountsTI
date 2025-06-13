describe('💻 3 Testes Interface do Serverest', () => {
 
  it('🔐 Cadastro de usuário pela interface sendo admin - válido', () => {
  cy.fixture('usuario').then((usuario) => {
    cy.cadastrarUsuarioUI(usuario.nome, usuario.email, usuario.password, usuario.administrador)
  })
})

it('❌ Cadastro de usuário duplicado', () => {
  cy.fixture('usuario').then((usuario) => {
    cy.cadastrarUsuarioDuplicadoUI(usuario.nome, usuario.email, usuario.password, usuario.administrador)
  })
})

  it('📦 Cadastro de produto pela interface', () => {
  cy.fixture("login").then((login) => {
    cy.loginUI(login.email, login.senha)
  cy.fixture("produto").then((produto) => {
    cy.cadastrarProdutoUI(produto)
    })
  })
})
})

describe('🔌3 Testes de API - Serverest', () => {
  let token = ''
  let produtoId = ''


  it('✅ Login via API deve retornar token', () => {
    cy.request('POST', 'https://serverest.dev/login', {
      email: 'emidio@mignozzetti.com',
      password: '123456'
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('authorization')
      token = res.body.authorization
    })
  })

  it('🛒 Cadastro de produto via API com token', () => {
    cy.fixture('produto').then((produto) => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: { Authorization: token },
        body: produto,
        failOnStatusCode: false
      }).then((res) => {
        expect(res.status).to.be.oneOf([201, 400]) 
        if (res.status === 201) {
          expect(res.body.message).to.eq('Cadastro realizado com sucesso')
        }
        if (res.status === 400) {
          expect(res.body.message).to.include('já existe')
        }
      })
    })
  })

    it.only('✅ Deve retornar a lista de usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('quantidade')
      expect(response.body).to.have.property('usuarios')
      expect(response.body.usuarios).to.be.an('array')

      cy.log(`Foram retornados ${response.body.quantidade} usuários.`)
    })
  })
})


