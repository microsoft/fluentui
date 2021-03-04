import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { selectors } from './dialogInDialogWithDropdown-example';

const outerHeader = `#${selectors.outerHeader}`;
const outerTrigger = `#${selectors.outerTrigger}`;
const innerHeader = `#${selectors.innerHeader}`;
const innerTrigger = `#${selectors.innerTrigger}`;
const dropdownSelector = `#${selectors.dropdown}`;
const dropdownIndicator = `.${dropdownSlotClassNames.toggleIndicator}`;
const dropdownList = `.${dropdownSlotClassNames.itemsList}`;

describe('Dialog in Dialog', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, outerTrigger);
  });

  it('Nested dialog should have dropdown', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);

    cy.visible(dropdownSelector);
  });

  it('Should not close any modal when ESC pressed inside dropdown', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);

    cy.clickOn(dropdownIndicator);
    cy.waitForSelectorAndPressKey(dropdownList, '{esc}');

    cy.visible(dropdownSelector);
    cy.visible(innerHeader);
    cy.exist(outerHeader);
  });

  it('Should modal with dropdown when ESC pressed outside dropdown', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);

    cy.clickOn(innerHeader);
    cy.waitForSelectorAndPressKey(innerHeader, '{esc}');

    cy.notExist(dropdownSelector);
    cy.notExist(innerHeader);
    cy.visible(outerHeader);
  });
});
