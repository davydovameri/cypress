import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: true,
  viewportWidth: 1280,
  viewportHeight: 800,
  retries: {
    runMode: 2,      
    openMode: 2   
  },
  e2e: {
    baseUrl: 'https://example.cypress.io', 
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
  },
});