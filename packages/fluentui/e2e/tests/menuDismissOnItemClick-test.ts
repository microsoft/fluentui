import { menuItemClassName } from '@fluentui/react-northstar';

const menuItem = `.${menuItemClassName}`;

const firstSubmenuItem = '#first';
const secondSubmenuItem = '#second';

describe('Dismiss Menu on Item Click', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuItem);
  });

  describe('Mouse interactions', () => {
    it('Should close on click', async () => {
      await e2e.expectCount(menuItem, 1);
      await e2e.clickOn(menuItem);
      await e2e.expectCount(menuItem, 3);
      await e2e.clickOn(firstSubmenuItem);
      await e2e.expectCount(menuItem, 1);
    });

    it('Should keep open on click of item with submenu', async () => {
      await e2e.expectCount(menuItem, 1);
      await e2e.clickOn(menuItem);
      await e2e.expectCount(menuItem, 3);
      await e2e.clickOn(secondSubmenuItem);
      await e2e.expectCount(menuItem, 4);
    });
  });

  describe('Keyboard interactions', () => {
    it('Should close on click', async () => {
      await e2e.expectCount(menuItem, 1);
      await e2e.focusOn(menuItem);
      await e2e.waitForSelectorAndPressKey(menuItem, 'Enter');
      await e2e.expectCount(menuItem, 3);
      await e2e.waitForSelectorAndPressKey(firstSubmenuItem, 'Enter');
      await e2e.expectCount(menuItem, 1);
    });

    it('Should keep open on click of item with submenu', async () => {
      await e2e.expectCount(menuItem, 1);
      await e2e.focusOn(menuItem);
      await e2e.waitForSelectorAndPressKey(menuItem, 'Enter');
      await e2e.expectCount(menuItem, 3);
      await e2e.focusOn(secondSubmenuItem);
      await e2e.waitForSelectorAndPressKey(secondSubmenuItem, 'Enter');
      await e2e.expectCount(menuItem, 4);
    });
  });
});
