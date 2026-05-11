/// <reference types="cypress" />

describe('SauceDemo Login - Cypress Demo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="title"]').should('contain.text', 'Products');
  });

  it('should show error with invalid credentials', () => {
    cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('wrong_password');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]').should('be.visible');
  });
});
