# Cypress API Test Suite

This Cypress project automates API testing for the [OpenCart Demo](https://demo.opencart.com/) platform, focusing on user registration and login. It uses Cypress to perform HTTP requests and verify the expected response payloads.

## Features

- **User Registration**: Automates the registration process with and without agreeing to the Privacy Policy.
- **User Login**: Automates the login process, including error handling for invalid credentials.
- **Dynamic Token Handling**: Handles dynamic tokens in query strings.
- **API Validation**: Verifies correct API responses for registration and login operations.

## Prerequisites

Before running the tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [Cypress](https://www.cypress.io/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LegendShola/Blusalt-task-3.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cypress-api-test-suite
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Test Scenarios

The following test scenarios are covered in this project:

### 1. **User Registration**
   - **Successful registration** with all required fields.
   - **Unsuccessful registration** when the user does not agree to the Privacy Policy.

### 2. **User Login**
   - **Successful login** with valid credentials.
   - **Unsuccessful login** with invalid credentials.

## Test Structure

The project follows the Page Object Model (POM) structure for easier test maintenance and readability.

### Page Objects
- **AuthPage**: Contains methods for interacting with the authentication API.
   - `login(email, password)`: Sends a login request with the provided email and password.
   - `register(firstName, lastName, email, password)`: Sends a registration request with the provided details.
   - `registerWithNoAgreement(firstName, lastName, email, password)`: Registers a user without agreeing to the Privacy Policy.

### Test Files
- **authspec.js**: Contains the test cases for registration and login.

### Cypress Commands
Custom Cypress commands are used to handle specific registration actions:

```javascript
Cypress.Commands.add('registerWithNoAgreement', (firstName, lastName, email, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://demo.opencart.com/index.php',
    qs: { 
        route: 'account/register.register',
        register_token: 'dynamic_register_token', // Replace with dynamic token logic
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
```

## How to Run Tests

1. To open the Cypress Test Runner, use the following command:
   ```bash
   npx cypress open
   ```

2. To run the tests headlessly, use:
   ```bash
   npx cypress run
   ```

## Example Tests

### Test Case: Verify User Registration Without Agreement

This test verifies the behavior of the API when a user tries to register without agreeing to the Privacy Policy:

```javascript
it('TC03 - Verify user registration with missing policy', () => {
  const firstName = 'Jane';
  const lastName = 'Doe';
  const email = `jane.doe+${Date.now()}@example.com`; 
  const password = 'SecuredPassword';

  cy.registerWithNoAgreement(firstName, lastName, email, password).then((response) => {
    expect(response.status).to.eq(200); // API returns 200 even for bad requests
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.have.property("warning", "Warning: You must agree to the Privacy Policy!");
  });
});
```

### Test Case: Verify Unsuccessful Login with Invalid Credentials

```javascript
it('TC02 - Verify unsuccessful login with invalid credentials', () => {
  const email = 'invalid.email@example.com';
  const password = 'WrongPassword';

  AuthPage.login(email, password).then((response) => {
    expect(response.status).to.eq(200); // Response code for invalid credentials is still 200
    expect(response.body.error).to.have.property("warning", "Warning: No match for E-Mail Address and/or Password.");
  });
});
```

## License

This project is licensed under the MIT License.

---

### Notes:

- The `register_token` must be dynamically fetched during runtime. You may want to implement logic to retrieve the correct token for each session.
- Modify the Cypress base URL and endpoints as necessary for different environments (e.g., production, staging).
