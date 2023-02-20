const CYPRESS_ACTION_TIMEOUT = 10 * 1000;

Cypress.Commands.add('gotoTestCase', (testFilePath, waitForSelector) => {
  const { _ } = Cypress;
  const path = testFilePath
    .split('/')
    .pop()
    .replace(/^(.+).spec.ts?$/, '$1')
    .replace(/^\//, '');

  cy.visit(`/${_.kebabCase(path)}`);
  cy.exist(waitForSelector);
});

Cypress.Commands.add('exist', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('exist');
});

Cypress.Commands.add('notExist', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('not.exist');
});

Cypress.Commands.add('nothingIsFocused', () => {
  cy.focused().should('not.exist');
});

Cypress.Commands.add('simulatePageMove', () => {
  cy.get('body').realTouch();
});

Cypress.Commands.add('nothingIsFocused', () => {
  cy.focused().should('not.exist');
});

Cypress.Commands.add('clickOn', selector => {
  cy.get(selector).realClick();
});

Cypress.Commands.add('mouseDownOn', selector => {
  cy.get(selector).trigger('mousedown');
});

Cypress.Commands.add('focusOn', selector => {
  cy.get(selector).focus();
});

Cypress.Commands.add('hoverOn', selector => {
  cy.get(selector).realHover();
});

Cypress.Commands.add('isFocused', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('be.focused');
});

Cypress.Commands.add('notVisible', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('not.be.visible');
});

Cypress.Commands.add('visible', selector => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('be.visible');
});

Cypress.Commands.add('resizeViewport', width => {
  cy.viewport(width, Cypress.config('viewportHeight'));
});

Cypress.Commands.add('expectTextOf', (selector, text) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.text', text);
});

Cypress.Commands.add('expectCount', (selector, count) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.length', count);
});

Cypress.Commands.add('hasComputedStyle', (selector, property, value) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.css', property, value);
});

Cypress.Commands.add('hasPropertyValue', (selector, property, value) => {
  cy.get(selector, { timeout: CYPRESS_ACTION_TIMEOUT }).should('have.prop', property, value);
});

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
