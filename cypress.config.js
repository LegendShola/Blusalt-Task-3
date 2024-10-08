const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/**/*spec.js',
    baseUrl: 'https://demo.opencart.com',
    requestTimeout: 60000,  // Increase the request timeout to 60 seconds
    responseTimeout: 60000, // Increase the response timeout to 60 seconds
    pageLoadTimeout: 120000, // Increase page load timeout to 120 seconds
  },
  reporter: 'junit',  // Using JUnit reporter for CI reporting
  reporterOptions: {
    mochaFile: 'cypress/reports/junit/results-[hash].xml',
    toConsole: true,
  },
});
