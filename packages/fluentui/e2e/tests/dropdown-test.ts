import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { selectors } from './dropdown-example';

const triggerButton = `.${selectors.triggerButtonClass}`;
const list = `.${dropdownSlotClassNames.itemsList}`;

describe('Dropdown', () => {
  describe('Focus behavior', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, triggerButton);
    });

    it('keeps focused on TAB from the dropdown list', async () => {
      await e2e.focusOn(triggerButton);

      await e2e.waitForSelectorAndPressKey(triggerButton, 'ArrowDown'); // open dropdown list
      await e2e.waitForSelectorAndPressKey(list, 'Tab'); // TAB from opened dropdown list

      await e2e.isFocused(triggerButton);
    });

    it('keeps focused on Shift+TAB from the dropdown list', async () => {
      await e2e.focusOn(triggerButton);

      await e2e.waitForSelectorAndPressKey(triggerButton, 'ArrowDown'); // open dropdown list
      await e2e.waitForSelectorAndPressKey(list, 'Tab', 'Shift'); // Shift+TAB from opened dropdown list

      await e2e.isFocused(triggerButton);
    });
  });
});
