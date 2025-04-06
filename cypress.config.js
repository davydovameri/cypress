import { defineConfig } from "cypress";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: true,
  viewportWidth: 1280,
  viewportHeight: 800,
  retries: {
    runMode: 0,
    openMode: 0
  },
  reporter: "mochawesome",
  reporterOption: {
    reportDir: 'mochawesome-report',
    reportFilename: `[status]_[datetime]-[name]-report`,
    overwrite: false,
    html: true,
    json: false
  },
  e2e: {
    baseUrl: 'https://example.cypress.io',
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,

    setupNodeEvents(on, config) {
      const configFile = config.env.configFile || 'qauto';
      const filePath = path.resolve(__dirname, `cypress.env.${configFile}.json`);
      const raw = fs.readFileSync(filePath);
      config.env = { ...config.env, ...JSON.parse(raw) };
      return config;
    },
  },
});