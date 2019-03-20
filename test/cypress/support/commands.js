Cypress.Commands.add('visitHome', title => {
  cy.log('Runs on each test');
  cy.log('Load fixture');
  cy.fixture('data.json').as('aliasData');
  cy.log('Visit the page');
  cy.visit('/');
  cy.hash().should('eq', '');
  cy.get('.title').should('contain', title);
});
