const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  projectId: 'c2tuou',
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);  // Enable Allure plugin
      return config;
    },
    specPattern: 'cypress/integration/**/*spec.js',
    baseUrl: 'https://demo.opencart.com',
    requestTimeout: 60000,  // Increase the request timeout to 60 seconds
    responseTimeout: 60000, // Increase the response timeout to 60 seconds
    pageLoadTimeout: 120000, // Increase page load timeout to 120 seconds
  },
  reporter: 'mochawesome',  // Continue using MochaAwesome as reporter
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',  // Directory for mochawesome reports
    overwrite: false,
    html: true,
    json: true,
  },
  env: {
    allure: true  // Enable Allure reports
  }
});
