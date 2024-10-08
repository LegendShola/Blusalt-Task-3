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
  reporter: 'mochawesome',  // Use Mocha Awesome reporter
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',  // Directory for mochawesome reports
    overwrite: false,
    html: true,
    json: true,
  },
});
