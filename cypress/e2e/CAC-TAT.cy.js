describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    
    cy.get('input[id="firstName"]').type('Maria')
    cy.get('input[id="lastName"]').type('Silva')
    cy.get('input[id="email"]').type('maria@email.com')
    cy.get('input[id="phone"]').type('11999999999')
    cy.get('select[id="product"]').select('YouTube')
    cy.get('input[type="radio"][value="ajuda"]').check()
    cy.get('input[type="checkbox"][value="phone"]').check()
    cy.get('textarea[id="open-text-area"]').type(
      'Estou com muitas dúvidas no funcionamento do aplicativo. Preciso de ajuda urgente para resolver todos os problemas que estou enfrentando. Aguardo retorno.',
      { delay: 0 }
    )
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.png')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.visit('./src/index.html')
    cy.get('input[id="firstName"]').type('M@ri@#')
    cy.get('input[id="lastName"]').type('S!lv@%')
    cy.get('input[id="email"]').type('email-errado@@@')
    cy.get('input[id="phone"]').type('telefone')
    cy.get('select[id="product"]').select('YouTube')
    cy.get('input[type="radio"][value="ajuda"]').check()
    cy.get('input[type="checkbox"][value="phone"]').check()
    cy.get('textarea[id="open-text-area"]').type(
      'Teste de erro com dados inválidos.',
      { delay: 0 }
    )
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  cy.visit('./src/index.html')
  cy.get('input[id="firstName"]')
    .type('Maria')
    .should('have.value', 'Maria')
    .clear()
    .should('have.value', '')

  cy.get('input[id="lastName"]')
    .type('Silva')
    .should('have.value', 'Silva')
    .clear()
    .should('have.value', '')

  cy.get('input[id="email"]')
    .type('maria@email.com')
    .should('have.value', 'maria@email.com')
    .clear()
    .should('have.value', '')

  cy.get('input[id="phone"]')
    .type('11999999999')
    .should('have.value', '11999999999')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy.visit('./src/index.html')
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
  })
})