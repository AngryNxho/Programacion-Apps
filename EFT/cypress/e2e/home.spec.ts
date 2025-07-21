describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/tabs/home');
    });
  
    it('Muestra las secciones de Peliculas recientes y de Peliculas recomendados', () => {
      cy.contains('Recent Movies').should('be.visible');
      cy.contains('Recommended Movies').should('be.visible');
    });
  
    it('Se realiza una busqueda de Peliculas y se devuelven resultados', () => {
      cy.get('ion-searchbar input').type('Movie Title{enter}');
      cy.get('.search-results-list ion-item').should('have.length.at.least', 1);
    });
  
    it('Selecciona un Pelicula de los resultados y se añade a la lista del usuario', () => {
      cy.get('ion-searchbar input').type('Movie Title{enter}');
      cy.get('.search-results-list ion-item').first().click();
      cy.get('ion-button').contains('Agregar a Mis Listas').click();
    });
  
    it('Abre y cierra el menú', () => {
      cy.get('ion-menu-button').click();
      cy.get('ion-menu[menu-id="mainMenu"]').should('be.visible');
      cy.get('ion-menu[menu-id="mainMenu"]').invoke('attr', 'side').then((side) => {
        if (side === 'start') {
          cy.get('body').click('left');
        } else {
          cy.get('body').click('right');
        }
      });
      cy.get('ion-menu[menu-id="mainMenu"]').should('not.be.visible');
    });
  
    it('Navega a la biblioteca desde el menú', () => {
      cy.get('ion-menu-button').click();
      cy.contains('Biblioteca').click();
      cy.url().should('include', '/tabs/biblioteca');
    });
  
    it('Cierra la sesión y se redirige a la pagina de ingreso', () => {
      cy.get('ion-menu-button').click();
      cy.contains('Cerrar Sesión').click();
      cy.url().should('include', '/login');
    });
  });