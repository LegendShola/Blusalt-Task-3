// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

// In cypress/support/commands.js

Cypress.Commands.add('registerWithNoAgreement', (firstName, lastName, email, password) => {
    // return this.getRegisterToken().then((registerToken) => {

    return cy.request({
        method: 'POST',
        url: 'https://demo.opencart.com/index.php',
        qs: { 
            route: 'account/register.register',
            register_token: 'dynamic_register_token', // Placeholder for the token; implement logic to get the actual token if needed
        },
        form: true,
        body: {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            newsletter: 0,
            agree: 0 // Set agree to 0 here
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
});


//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })