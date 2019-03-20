describe('Search a film', () => {

  before(() => {
    cy.log('Begin the test');
  });

  after(() => {
    cy.log('Completed test block');
  });

  beforeEach(() => {
    cy.visitHome('OMDb API');
  });

  afterEach(() => {
    cy.log('Test completed correctly');
  });

  it('Search the title of a movie and show the list of films', () => {
    cy.get('@aliasData').then((data) => {
      cy.log('Fixture content');
      cy.wrap(data).each((value, i, array) => {
        cy.get('.box-search input').clear().type(value.title);
        cy.get('.box-search a').click();
        cy.get('img').should(($img) => {
          expect($img.length).to.be.greaterThan(1)
        });
      });
    })
  });

  it.skip('Check debugger and .debug()', () => {
    cy.get('.box-search input').then(() => {
      cy.log('Debug');
      debugger;
    });
    cy.get('.box-search input').debug();
  });

  it('When we write a search, the search icon is displayed', () => {
    cy.get('.box-search input').type('test icons');
    cy.get('.box-search > a > .svg-inline--fa').should('have.class', 'fa-search');

  });

  it('Search the title of a movie and show the details of the film', () => {
    cy.get('.box-search input').type('indiana jones');
    cy.get('.box-search a').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > .image-data > table > :nth-child(1) > th > .icon-right').click();
    cy.wait(1000);
    cy.get('img').should('have.length', 1);
    cy.get(':nth-child(1) > th').should('contain', 'Title');
    cy.get(':nth-child(2) > th').should('contain', 'Year');
    cy.get(':nth-child(3) > th').should('contain', 'Rated');
    cy.get(':nth-child(4) > th').should('contain', 'Released');
    cy.get(':nth-child(5) > th').should('contain', 'Runtime');
    cy.get(':nth-child(6) > th').should('contain', 'Genre');
    cy.get(':nth-child(7) > th').should('contain', 'Director');
    cy.get(':nth-child(8) > th').should('contain', 'Writer');
    cy.get(':nth-child(9) > th').should('contain', 'Actors');
    cy.get(':nth-child(10) > th').should('contain', 'Plot');
    cy.get(':nth-child(11) > th').should('contain', 'Language');
    cy.get(':nth-child(12) > th').should('contain', 'Country');
    cy.get(':nth-child(13) > th').should('contain', 'Awards');
    cy.get(':nth-child(14) > th').should('contain', 'Ratings');
    cy.get(':nth-child(15) > th').should('contain', 'Metascore');
    cy.get(':nth-child(16) > th').should('contain', 'imdbRating');
    cy.get(':nth-child(17) > th').should('contain', 'imdbVotes');
    cy.get(':nth-child(18) > th').should('contain', 'imdbID');
    cy.get(':nth-child(19) > th').should('contain', 'Type');
    cy.get(':nth-child(20) > th').should('contain', 'DVD');
    cy.get(':nth-child(21) > th').should('contain', 'BoxOffice');
    cy.get(':nth-child(22) > th').should('contain', 'Production');
    cy.get(':nth-child(23) > th').should('contain', 'Website');
  });

  it('Search the title of a movie incorrect and shows error message', () => {
    cy.get('.box-search input').type('awsedrftgqysgtwuwhshd');
    cy.get('.box-search a').click();
    cy.get('.error').should('be.visible').and('contain', 'Movie not found!');
  });

  it('Search the title of a movie and show the name of the movie that was found', () => {
    cy.get('.box-search input').type('indiana jones');
    cy.get('.box-search a').click();
    cy.get('.busqueda > h1').should('be.visible').and('contain', 'Buscando');
  });

});

describe('Navigation on the page', () => {

  it('When we are in the home option', () => {
    cy.get('.router-link-exact-active').contains('Home').click();
    cy.get('[href="/contact"]').should('contain', 'Contacto');

  });

  it('When we are in the contact option', () => {
    cy.get('[href="/contact"]').contains('Contacto').click();
    cy.get('.router-link-exact-active').contains('Contacto');
    cy.get('h1').should('be.visible').and('contain', 'Donde estamos');
    cy.get('#gmap_canvas').should('be.visible');
  });

});
