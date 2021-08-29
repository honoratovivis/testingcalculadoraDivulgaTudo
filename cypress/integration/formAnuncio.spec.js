describe('Form Anuncios', () => {
  beforeEach(() => {
    cy.visit('../../cadastrarAnuncios.html') 
  })
  
  const data = require('../fixtures/data.json')
  
  data.forEach((item, index) => {
    it(`${index + 1} Preencher Inputs de Form, testar Submit e Asserts`, () => {
        cy.get('#nomeAnuncio').type(item.nomeAnuncio)
        cy.get('#nome').type(item.nome)
        cy.get('#investimentoDiario').type(item.investimentoDiario)
        cy.get('#selecoes').select(item.seletor)
        cy.get('#pacote02').check()
        cy.get('#anual ').check()
        cy.get('[data-cy=start-cy]').type(item.dataInicial)
        cy.get('[data-cy=end-cy]').type(item.dataFinal)
        cy.get('#btn-Investimento').click()

        cy.assertPreenchimentoDeFormESubmit()
      })
  })
})