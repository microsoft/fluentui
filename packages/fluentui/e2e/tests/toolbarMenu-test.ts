import { selectors } from './toolbarMenu-example';

const beforeToolbarId = `#${selectors.beforeToolbarId}`;
const afterToolbarId = `#${selectors.afterToolbarId}`;
const menuTrigger = `#${selectors.triggerButtonId}`;
const toolbarMenu = `.${selectors.toolbarMenu}`;
const menuItemButton = (index: number) => `#${selectors.menuItemButtonId}-${index}`;

describe('Toolbar menu on', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuTrigger);
  });

  it('TAB moves focus to next tabbable element after toolbar', async () => {
    // opens menu
    await e2e.clickOn(menuTrigger);
    await e2e.exists(toolbarMenu);

    // TAB from opened menu
    await e2e.waitForSelectorAndPressKey(toolbarMenu, 'Tab');

    await e2e.isFocused(afterToolbarId);
    await e2e.expectHidden(toolbarMenu);
  });

  it('Should toggle the menu', async () => {
    // opens menu
    await e2e.clickOn(menuTrigger);
    await e2e.exists(toolbarMenu);

    await e2e.clickOn(menuTrigger);

    await e2e.isFocused(menuTrigger);
    await e2e.expectHidden(toolbarMenu);
  });

  it('Shift+TAB moves focus to previous tabbable element before toolbar', async () => {
    // opens menu
    await e2e.clickOn(menuTrigger);
    await e2e.exists(toolbarMenu);

    // Shift+TAB from opened menu
    await e2e.waitForSelectorAndPressKey(toolbarMenu, 'Tab', 'Shift');

    await e2e.isFocused(beforeToolbarId);
    await e2e.expectHidden(toolbarMenu);
  });

  it('moves focus to particular element, after press "Enter" on menu item', async () => {
    // opens menu
    await e2e.clickOn(menuTrigger);
    await e2e.exists(toolbarMenu);
    await e2e.isFocused(menuItemButton(0));

    // press enter on first menu item
    await e2e.waitForSelectorAndPressKey(menuItemButton(0), 'Enter');

    // verify focus was moved to button, this action is defined in 'onClick'
    await e2e.isFocused(afterToolbarId);
    // verify menu was closed
    await e2e.expectHidden(toolbarMenu);
  });
});
