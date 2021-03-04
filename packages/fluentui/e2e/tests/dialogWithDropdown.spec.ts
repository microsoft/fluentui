import { selectors } from './dialogWithDropdown-example';
import { dropdownSlotClassNames } from '@fluentui/react-northstar';

const dialogTrigger = `#${selectors.dialogTrigger}`;
const dialogHeader = `#${selectors.dialogHeader}`;
const dropdownSelector = `#${selectors.dropdown}`;
const dropdownIndicator = `.${dropdownSlotClassNames.toggleIndicator}`;
const dropdownList = `.${dropdownSlotClassNames.itemsList}`;

describe('Dialog with dropdown', () => {
  beforeEach(() => {
    cy.gotoTestCase(__filename, dialogTrigger);
  });

  it('should render with dropdown', () => {
    cy.clickOn(dialogTrigger);
    cy.visible(dropdownSelector);
  });

  it('should not close dialog and keep focus on dropdown when pressing ESC', () => {
    cy.clickOn(dialogTrigger);
    cy.clickOn(dropdownIndicator);

    cy.waitForSelectorAndPressKey(dropdownList, '{esc}');
    cy.visible(dropdownSelector);
  });

  it('should close when ESC pressed in the dialog', () => {
    cy.clickOn(dialogTrigger);
    cy.clickOn(dropdownIndicator);

    cy.waitForSelectorAndPressKey(dropdownList, '{esc}');
    cy.visible(dropdownSelector);

    cy.clickOn(dialogHeader);
    cy.waitForSelectorAndPressKey(dialogHeader, '{esc}');
    cy.notExist(dropdownSelector);
  });

  it('should close when ESC pressed in the closed dropdown', () => {
    cy.clickOn(dialogTrigger); // open dialog
    cy.waitForSelectorAndPressKey(dropdownSelector, '{downarrow}'); // open list

    cy.waitForSelectorAndPressKey(dropdownList, '{esc}'); // closes list
    cy.waitForSelectorAndPressKey(dialogHeader, '{esc}'); // closes dialog
    cy.notExist(dropdownSelector);
    cy.notExist(dialogHeader);
  });
});
