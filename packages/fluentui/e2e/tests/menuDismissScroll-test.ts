import { menuItemClassName } from '@fluentui/react-northstar';

const menuItem = `.${menuItemClassName}`;

describe('Dismiss Menu on Scroll', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuItem);
  });

  describe('cursor behavior on an input', () => {
    it('Should close on scroll', async () => {
      expect(await e2e.count(menuItem)).toBe(1);
      await e2e.clickOn(menuItem);
      expect(await e2e.count(menuItem)).toBe(3);
      await e2e.simulatePageMove();
      expect(await e2e.count(menuItem)).toBe(1);
    });
  });
});
