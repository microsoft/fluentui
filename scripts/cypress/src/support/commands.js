/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Navigates to storybook story URL based on component name and story name
 */

/**
 * Press command fallback for Cypress 13 compatibility.
 * Registers only on Cypress v13, where `cy.press` is not built-in.
 */
const CYPRESS_MAJOR_VERSION =
  typeof Cypress !== 'undefined' && Cypress.version ? Number(String(Cypress.version).split('.')[0]) : undefined;

if (CYPRESS_MAJOR_VERSION === 13) {
  Cypress.Commands.add('press', /** @type {any} */ (require('cypress-real-events/commands/realPress').realPress));
}
