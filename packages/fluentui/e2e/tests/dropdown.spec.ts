import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { selectors } from './dropdown-example';

const triggerButton = `.${selectors.triggerButtonClass}`;
const list = `.${dropdownSlotClassNames.itemsList}`;

describe('Dropdown', () => {
  describe('Focus behavior', () => {
    beforeEach(() => {
      cy.gotoTestCase(__filename, triggerButton);
    });

    it('keeps focused on TAB from the dropdown list', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab'); // TAB from opened dropdown list

      cy.isFocused(triggerButton);
    });

    it('keeps focused on Shift+TAB from the dropdown list', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab', 'Shift'); // Shift+TAB from opened dropdown list

      cy.isFocused(triggerButton);
    });
  });
});
