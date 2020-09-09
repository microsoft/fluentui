import { dropdownSlotClassNames } from '@fluentui/react-northstar';
import { selectors, inputItems } from './dropdownMoveFocusOnTab-example';

const triggerButton = `.${selectors.triggerButtonClass}`;
const nextFocusableSibling = `#${selectors.nextFocusableSibling}`;
const previousFocusableSibling = `#${selectors.previousFocusableSibling}`;
const listItem = `.${selectors.listItem}`;
const list = `.${dropdownSlotClassNames.itemsList}`;

describe('Dropdown', () => {
  describe('Focus behavior', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, triggerButton);
    });

    it('moves focus to next element on Tab', async () => {
      await e2e.focusOn(triggerButton);

      await e2e.waitForSelectorAndPressKey(triggerButton, 'ArrowDown'); // open dropdown list
      await e2e.waitForSelectorAndPressKey(list, 'Tab'); // TAB from opened dropdown list

      await e2e.isFocused(nextFocusableSibling);
    });

    it('moves focus to previous element on Shift-Tab', async () => {
      await e2e.focusOn(triggerButton);

      await e2e.waitForSelectorAndPressKey(triggerButton, 'ArrowDown'); // open dropdown list
      await e2e.waitForSelectorAndPressKey(list, 'Tab', 'Shift'); // Shift+TAB from opened dropdown list

      await e2e.isFocused(previousFocusableSibling);
    });

    it('closes dropdown on outside click', async () => {
      await e2e.clickOn(triggerButton);
      await e2e.count(listItem, inputItems.length);

      await e2e.clickOn(previousFocusableSibling);
      await e2e.count(listItem, 0);
    });
  });
});
