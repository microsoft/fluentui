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
      expect(await e2e.getPropertyValue(selectors.input, 'selectionStart')).toBe(0);

      await e2e.waitForSelectorAndPressKey(selectors.input, 'End');
      expect(await e2e.getPropertyValue(selectors.input, 'selectionStart')).toBe(2);
    });

    it('cursor position is preserved', async () => {
      await e2e.focusOn(selectors.input);

      await e2e.waitForSelectorAndPressKey(selectors.input, 'F');
      await e2e.waitForSelectorAndPressKey(selectors.input, 'ArrowLeft');
      await e2e.waitForSelectorAndPressKey(selectors.input, 'O');

      expect(await e2e.getPropertyValue(selectors.input, 'selectionStart')).toBe(1);
      expect(await e2e.getPropertyValue(selectors.input, 'value')).toBe('OF');
    });
  });
});
