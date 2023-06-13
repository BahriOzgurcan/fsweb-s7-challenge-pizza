const { defineConfig } = require("cypress");

// cy.viewport(1550, 750)
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"http://localhost:3000/"
  },
});
