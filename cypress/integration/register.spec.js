describe('Navigate to Register or login', () => {
  it('Register', () => {
    // Navigate to the homepage
    cy.visit('localhost:3000');

    // Verify that the homepage content is on the page

    // Click on the Register button
    cy.get(
      // CSS selector
      '[data-cy=go-to-register]',
    ).click();

    // Click on Login button
    cy.get(
      // CSS selector
      '[data-cy=go-to-login]',
    ).click();

    // cy.get(
    //   // CSS selector
    //   '[data-cy="go-to-login]',
    // ).type('Peter');

    // Test if the user list page description element
    // is visible
    // cy.get('[data-cy=user-list-page-description]')
    // Both of `should` and `be.visible` are defined
    // by the test framework
    // .should('be.visible');

    // Test whether the title has been set correctly
    //   cy.title().should('eq', 'User list');
    // });

    // it('Manual navigation works', () => {
    //   cy.visit('/');
    //   cy.visit('/users');
    //   cy.title().should('eq', 'Users');
    //   cy.visit('/users/new');
    //   cy.title().should('eq', 'New User');
    //   cy.get('[data-cy=new-user-first-name-input]').should('be.visible');
  });
});
