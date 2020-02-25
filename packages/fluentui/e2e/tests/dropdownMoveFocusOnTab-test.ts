import { selectors } from './dropdownMoveFocusOnTab-example';

const triggerButton = `.${selectors.triggerButtonClass}`;
const nextFocusableSibling = `#${selectors.nextFocusableSibling}`;
const previousFocusableSibling = `#${selectors.previousFocusableSibling}`;

describe('Dropdown', () => {
  describe('Focus behavior', () => {
    beforeEach(async () => {
      await e2e.gotoTestCase(__filename, triggerButton);
    });

    it('moves focus to next element on Tab', async () => {
      await e2e.focusOn(triggerButton);

      await e2e.pressKey('ArrowDown'); // open dropdown list
      await e2e.pressKey('Tab'); // TAB from opened dropdown list

      expect(await e2e.isFocused(triggerButton)).toBe(false);
      expect(await e2e.isFocused(nextFocusableSibling)).toBe(true);
    });

    it('moves focus to previous element on Shift-Tab', async () => {
      await e2e.focusOn(triggerButton);

      await e2e.pressKey('ArrowDown'); // open dropdown list
      await e2e.pressKey('Tab', 'Shift'); // Shift+TAB from opened dropdown list

      expect(await e2e.isFocused(triggerButton)).toBe(false);
      expect(await e2e.isFocused(previousFocusableSibling)).toBe(true);
    });
  });
});
