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

        //simulation call  HTTP
        cy.server()
        cy.route('POST', '**/simulation').as('postSimulation')

        cy.get('#btn-Investimento').click()

        cy.wait('@postSimulation').then((xhr) => {
            expect(xhr.status).be.eq(200)
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null
        })

        cy.assertPreenchimentoDeFormESubmit()
      })
    
      it.skip ('Form Preenchido com Teste de ID', () => {
        const createForm = Cypress.env ('createForm')
  
        cy.log(createForm)
        cy.visit ('../../simulation.html')
        cy.get('input').type(createForm)
        cy.get('#btn').click()
      })
    })

})