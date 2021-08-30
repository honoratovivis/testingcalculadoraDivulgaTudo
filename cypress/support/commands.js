Cypress.Commands.add('assertPreenchimentoDeFormESubmit', () =>{
  cy.get('#nomeAnuncio').should('be.empty')
  cy.get('#nome').should('be.empty')
  cy.get('#investimentoDiario').should('be.empty')
  cy.get('#selecoes').find('option')
      .and('contain', 'Selecionar') 
      .should('be.selected')
  cy.get('#pacote03').should('not.be.checked')
  cy.get('#pacote03').should('not.be.checked')
  cy.get('#mensal').should('not.be.checked')
  cy.get('[data-cy=start-cy]').should('be.empty')
  cy.get('[data-cy=end-cy]').should('be.empty')
  cy.get('#projecaoAproximada').should('be.visible')
     .and('contain', 'Essa é a projeção aproximada')
})

Cypress.Commands.add("createForm", () => {
  cy.request({
        method: 'POST',
        url: '../../cadastrarAnuncios.html',
        body: {
                      nomeAnuncio: "Curso Tech ReactJS",
                      nome: "Viviane Honorato",
                      investimentoDiario: "125",
                      seletor: "Sociedade Limitada Unipessoal",
                      dataInicial: "2021-08-20",
                      dataFinal: "2021-08-28"
        }
    }).then (response => {
            expect(response.body.id).is.not.null
            cy.log(response.body.id)

    Cypress.env('createForm', response.body.id)
    })
})