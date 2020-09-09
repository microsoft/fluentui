import { selectors } from './dropdownSearch-example';

describe('DropdownSearch', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, selectors.input);
  });

  describe('cursor behavior on an input', () => {
    it('Home/End moves cursor', async () => {
      await e2e.focusOn(selectors.input);

      await e2e.waitForSelectorAndPressKey(selectors.input, 'F');
      await e2e.waitForSelectorAndPressKey(selectors.input, 'O');

      await e2e.waitForSelectorAndPressKey(selectors.input, 'Home');
      await e2e.hasPropertyValue(selectors.input, 'selectionStart', 0);

      await e2e.waitForSelectorAndPressKey(selectors.input, 'End');
      await e2e.hasPropertyValue(selectors.input, 'selectionStart', 2);
    });

    it('cursor position is preserved', async () => {
      await e2e.focusOn(selectors.input);

      await e2e.waitForSelectorAndPressKey(selectors.input, 'F');
      await e2e.waitForSelectorAndPressKey(selectors.input, 'ArrowLeft');
      await e2e.waitForSelectorAndPressKey(selectors.input, 'O');

      await e2e.hasPropertyValue(selectors.input, 'selectionStart', 1);
      await e2e.hasPropertyValue(selectors.input, 'value', 'OF');
    });
  });
});
