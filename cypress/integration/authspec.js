// cypress/integration/auth.spec.js

import AuthPage from '../support/pageObjects/AuthPage';

describe('API Testing for Registration and Login', () => {

  beforeEach(() => {
    cy.wait(2000); // Wait for 2 seconds before each test
  });  
  
  it('TC01 - Verify user registration with valid details', () => {
    const firstName = 'Jane';
    const lastName = 'Doe';
    const email = 'jane.doe+${Date.now()}@example.com'; // Unique email
    const password = 'SecurePassword123!';
    AuthPage.register(firstName, lastName, email, password)
    .then((response) => {
      expect(response.status).to.eq(200); // Assuming 200 is the expected status for a successful registration
    });
  });

  it('TC02 - Verify user registration with a registered email address', () => {
    const firstName = 'Jane';
    const lastName = 'Doe';
    const email = "brenon@duckdocks.org";
    const password = 'SecurePassword123!';

    AuthPage.register(firstName, lastName, email, password)
      .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.have.property('warning', 'Warning: E-Mail Address is already registered!');
    });
  });

  it('TC03 - Verify registration with missing email field', () => {
    const firstName = 'Jane';
    const lastName = 'Doe';
    const email = "";
    const password = 'SecurePassword123!';
    AuthPage.register(firstName, lastName, email, password).then((response) => {
      expect(response.status).to.eq(200); // 200 is returned even for Bad requests on saucelabs website
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.have.property('email', 'E-Mail Address does not appear to be valid!'); 
    });
  });

  it('TC04 - Verify user registration with missing password field', () => {
    const firstName = 'Jane';
    const lastName = 'Doe';
    const email = `jane.doe+${Date.now()}@example.com`; 
    const password = '';
    AuthPage.register(firstName, lastName, email, password).then((response) => {
      expect(response.status).to.eq(200); // 200 is returned even for Bad requests on saucelabs website
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.have.property('password', 'Password must be between 4 and 20 characters!'); 
    });
  });

  it('TC05 - Verify user registration with missing policy', () => {
    const firstName = 'Jane';
    const lastName = 'Doe';
    const email = `jane.doe+${Date.now()}@example.com`; 
    const password = 'SecuredPassword';

    AuthPage.register2(firstName, lastName, email, password).then((response) => {
        expect(response.status).to.eq(200); // 200 is returned even for Bad requests on saucelabs website
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.have.property("warning", "Warning: You must agree to the Privacy Policy!"); 
    });
  });

  // Test case for successful login with valid credentials
  it('TC06 - Verify user login with valid credentials', () => {
    const email = 'brenon@duckdocks.org';
    const password = 'Password';

    AuthPage.login(email, password)
      .then((response) => {
        expect(response.status).to.eq(200); // Assert successful login
      });
  });

  // Test case for unsuccessful login with invalid credentials
  it('TC07 - Verify unsuccessful login with invalid credentials', () => {
    const invalidEmail = 'invalid.email@example.com';
    const invalidPassword = 'WrongPassword';

    AuthPage.login(invalidEmail, invalidPassword)
      .then((response) => {
        expect(response.status).to.eq(200); // Opencart might return 200 even for errors
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.have.property('warning', 'Warning: No match for E-Mail Address and/or Password.');
      });
  });

  it('TC08 - Verify unsuccessful login with missing ppassword', () => {
    const email = `jane.doe+${Date.now()}@example.com`;
    const password = '';

    AuthPage.login(email, password)
      .then((response) => {
        expect(response.status).to.eq(200); // Opencart might return 200 even for errors
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.have.property('warning', 'Warning: No match for E-Mail Address and/or Password.');
      });
  });

  it('TC09 - Verify unsuccessful login with missing email address', () => {
    const email = ``;
    const password = 'P1ssw4rd0';

    AuthPage.login(email, password)
      .then((response) => {
        expect(response.status).to.eq(200); // Opencart might return 200 even for errors
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.have.property('warning', 'Warning: No match for E-Mail Address and/or Password.');
      });
  });
});