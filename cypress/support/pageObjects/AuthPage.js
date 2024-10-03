// cypress/support/pageObjects/AuthPage.js

class AuthPage {

    // Fetch registration page to get the dynamic register token
    getRegisterToken() {
        return cy.request({
            method: 'GET',
            url: 'https://demo.opencart.com/index.php?route=account/register',
        }).then((response) => {
            // Parse the response to extract the token from the response body or the url
            const token = /register_token=([\w\d]+)/.exec(response.body)[1];
            return token; // Return the extracted register token
        });
    }


    // API method for user registration
    register(firstName, lastName, email, password) {
        return this.getRegisterToken().then((registerToken) => {
            return cy.request({
                method: 'POST',
                url: 'https://demo.opencart.com/index.php',
                qs: { // Add query string parameters
                    route: 'account/register.register',
                    register_token: registerToken, // Use the dynamic register token
                },
                form: true,
                body: {
                  firstname: firstName,
                  lastname: lastName,
                  email: email,
                  password: password,
                  newsletter: 0,
                  agree: 1 // Agree to the Privacy Policy
                },
                headers: {
                  'Content-Type': 'application/json'
                }
            });
        });
    }

    // API method for user registration without policy agreement
    register2(firstName, lastName, email, password) {
        return this.getRegisterToken().then((registerToken) => {
            return cy.request({
                method: 'POST',
                url: 'https://demo.opencart.com/index.php',
                qs: { // Add query string parameters
                    route: 'account/register.register',
                    register_token: registerToken, // Use the dynamic register token
                },
                form: true,
                body: {
                  firstname: firstName,
                  lastname: lastName,
                  email: email,
                  password: password,
                  newsletter: 0,
                  agree: 0 // Skip the Privacy Policy
                },
                headers: {
                  'Content-Type': 'application/json'
                }
            });
        });
    }
    
  
    // Fetch login page to get the dynamic login token
    getLoginToken() {
        return cy.request({
            method: 'GET',
            url: 'https://demo.opencart.com/index.php?route=account/login',
        }).then((response) => {
            // Parse the response to extract the token from the response body or URL
            const token = /login_token=([\w\d]+)/.exec(response.body)[1];
            return token; // Return the extracted login token
        });
    }

    // API method for user login with the fetched login token
    login(email, password) {
        return this.getLoginToken().then((loginToken) => {
            return cy.request({
                method: 'POST',
                url: 'https://demo.opencart.com/index.php',
                qs: { // Add query string parameters
                    route: 'account/login.login',
                    login_token: loginToken, // Use the dynamic login token
                },
                form: true,
                body: {
                    email: email,
                    password: password,
                }
            });
        });
    }
}

export default new AuthPage();