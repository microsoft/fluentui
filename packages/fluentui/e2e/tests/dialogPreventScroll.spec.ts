import { selectors } from './dialogPreventScroll-example';

const outerClose = `#${selectors.outerClose}`;
const outerTrigger = `#${selectors.outerTrigger}`;
const innerClose = `#${selectors.innerClose}`;
const innerTrigger = `#${selectors.innerTrigger}`;

describe('Dialog scroll', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, outerTrigger);
  });

  it('should prevent scroll on the body when dialog is open', () => {
    cy.clickOn(outerTrigger);
    cy.visible(outerClose);
    cy.hasComputedStyle('body', 'overflow', 'hidden');
  });

  it('should prevent scroll on the body when nested dialog is open', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);
    cy.visible(innerClose);
    cy.hasComputedStyle('body', 'overflow', 'hidden');
  });

  it('should prevent scroll on the body when nested dialog is closed', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);
    cy.visible(innerClose);
    cy.hasComputedStyle('body', 'overflow', 'hidden');

    cy.clickOn(innerClose);
    cy.notExist(innerClose);
  });

  it('should reset overflow', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);
    cy.hasComputedStyle('body', 'overflow', 'hidden');

    cy.clickOn(innerClose);
    cy.clickOn(outerClose);
    cy.hasComputedStyle('body', 'overflow', 'visible');
  });
});
