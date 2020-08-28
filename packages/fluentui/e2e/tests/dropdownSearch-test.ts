import { selectors } from './dropdownSearch-example';

describe('DropdownSearch', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, selectors.input);
  });

  describe('cursor behavior on an input', () => {
    it('Home/End moves cursor', async () => {
      await e2e.focusOn(selectors.input);

      await e2e.pressKey('f');
      await e2e.pressKey('o');

      await e2e.pressKey('Home');
      expect(await e2e.getPropertyValue(selectors.input, 'selectionStart')).toBe(0);

      await e2e.pressKey('End');
      expect(await e2e.getPropertyValue(selectors.input, 'selectionStart')).toBe(2);
    });

    it('cursor position is preserved', async () => {
      await e2e.focusOn(selectors.input);

      await e2e.pressKey('f');
      await e2e.pressKey('ArrowLeft');
      await e2e.pressKey('o');

      expect(await e2e.getPropertyValue(selectors.input, 'selectionStart')).toBe(1);
      expect(await e2e.getPropertyValue(selectors.input, 'value')).toBe('of');
    });
  });
});
