import { menuItemClassName } from '@fluentui/react-northstar';

const menuItem = `.${menuItemClassName}`;

describe('Dismiss Menu on Scroll', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuItem);
  });

  describe('cursor behavior on an input', () => {
    it('Should close on scroll', async () => {
      await e2e.expectCount(menuItem, 1);

      await e2e.clickOn(menuItem);
      await e2e.expectCount(menuItem, 3);

      await e2e.simulatePageMove();
      await e2e.expectCount(menuItem, 1);
    });
  });
});
