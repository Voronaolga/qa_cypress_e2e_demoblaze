
describe('DemoBlaze e2e Tests', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
  });

  it('should register a new user', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').type(user.username);
    cy.get('#sign-password').type(user.password);
    cy.contains('.btn.btn-primary', 'Sign up').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Sign up successful.');
    });
  });

  it('should log in with an existing user', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').type(user.username);
    cy.get('#loginpassword').type(user.password);
    cy.contains('.btn.btn-primary', 'Log in').click();
    cy.contains(`Welcome ${user.username}`);
  });

  it('should add Samsung Galaxy S6 to the cart', () => {
    cy.get('.card-title').contains('Samsung galaxy s6').click();
    cy.get('.btn.btn-success.btn-lg').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Product added');
    });
  });
});
