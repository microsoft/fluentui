// / <reference types="cypress" />
import * as path from 'path';
import * as _ from 'lodash';

const CYPRESS_ACTION_TIMEOUT = 10 * 1000;

const exampleUrlTokenFromFilePath = filepath => {
  const testname = path
    .basename(filepath)
    .replace(/^(.+)-test.tsx?$/, '$1')
    .replace(/^(.+).spec.ts?$/, '$1')
    .replace(/^(.+)-example.tsx?$/, '$1');

  return _.kebabCase(testname);
};

// cypress/support/index.ts
Cypress.Commands.add('goto', (docsUrl, waitForSelector) => {
  cy.visit(`/${docsUrl.replace(/^\//, '')}`);
  cy.exist(waitForSelector);
});

// cypress/support/index.ts
Cypress.Commands.add('gotoTestCase', (testFilePath, waitForSelector) => {
  const testCaseUrl = `/${exampleUrlTokenFromFilePath(testFilePath)}`;
  cy.goto(testCaseUrl, waitForSelector);
});

// cypress/support/index.ts
Cypress.Commands.add('exist', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('exist');
});

// cypress/support/index.ts
Cypress.Commands.add('notExist', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('not.exist');
});

// cypress/support/index.ts
Cypress.Commands.add('nothingIsFocused', () => {
  cy.focused().should('not.exist');
});

// cypress/support/index.ts
Cypress.Commands.add('simulatePageMove', () => {
  cy.get('body').realTouch();
});

// cypress/support/index.ts
Cypress.Commands.add('nothingIsFocused', () => {
  cy.focused().should('not.exist');
});

// cypress/support/index.ts
Cypress.Commands.add('clickOn', selector => {
  cy.get(selector).realClick();
});

// cypress/support/index.ts
Cypress.Commands.add('focusOn', selector => {
  cy.get(selector).focus();
});

// cypress/support/index.ts
Cypress.Commands.add('hover', selector => {
  cy.get(selector).realHover();
});

// cypress/support/index.ts
Cypress.Commands.add('isFocused', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('be.focused');
});

// cypress/support/index.ts
Cypress.Commands.add('notVisible', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('not.be.visible');
});

// cypress/support/index.ts
Cypress.Commands.add('visible', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('be.visible');
});

// cypress/support/index.ts
Cypress.Commands.add('resizeViewport', width => {
  cy.viewport(width, Cypress.config('viewportHeight'));
});

// cypress/support/index.ts
Cypress.Commands.add('expectTextOf', (selector, text) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.text', text);
});

// cypress/support/index.ts
Cypress.Commands.add('expectCount', (selector, count) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.length', count);
});

// cypress/support/index.ts
Cypress.Commands.add('hasComputedStyle', (selector, property, value) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.css', property, value);
});

// cypress/support/index.ts
Cypress.Commands.add('hasPropertyValue', (selector, property, value) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.prop', property, value);
});

// cypress/support/index.ts
Cypress.Commands.add('waitForSelectorAndPressKey', (selector, key, modifier) => {
  // Enter doesn't work properly for now. It can be hotfixed by Space
  // https://github.com/dmtrKovalenko/cypress-real-events/issues/8
  if (key === '{enter}') {
    cy.realPress('Space');
    return;
  }

  if (key === 'т') {
    cy.get(selector).type(key);
    return;
  }

  if (modifier) {
    cy.realPress([modifier, key]);
    return;
  }
  cy.realPress(key);
});
