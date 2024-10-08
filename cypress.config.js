const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/**/*spec.js',
  },
  reporter: 'junit',  // Changed the reporter to 'junit'
  reporterOptions: {
    mochaFile: 'cypress/reports/junit/results-[hash].xml',  // Save report files as XML in the specified directory
    toConsole: true,  // Optional: Log test results to the console
  },
});
