import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { selectors, inputItems } from './dropdownMoveFocusOnTab-example';

const triggerButton = `.${selectors.triggerButtonClass}`;
const nextFocusableSibling = `#${selectors.nextFocusableSibling}`;
const previousFocusableSibling = `#${selectors.previousFocusableSibling}`;
const listItem = `.${selectors.listItem}`;
const list = `.${dropdownSlotClassNames.itemsList}`;

describe('Dropdown', () => {
  describe('Focus behavior', () => {
    beforeEach(() => {
      cy.gotoTestCase(__filename, triggerButton);
    });

    it('moves focus to next element on Tab', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab'); // TAB from opened dropdown list

      cy.isFocused(nextFocusableSibling);
    });

    it('moves focus to previous element on Shift-Tab', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab', 'Shift'); // Shift+TAB from opened dropdown list

      cy.isFocused(previousFocusableSibling);
    });

    it('closes dropdown on outside click', () => {
      cy.clickOn(triggerButton);
      cy.expectCount(listItem, inputItems.length);

      cy.clickOn(previousFocusableSibling);
      cy.expectCount(listItem, 0);
    });
  });
});
