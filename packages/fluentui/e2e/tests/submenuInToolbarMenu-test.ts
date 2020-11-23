import { selectors } from './submenuInToolbarMenu-example';

const toolbarMenuId = `#${selectors.toolbarMenuId}`;
const toolbarMenuSubmenuId = `#${selectors.toolbarMenuSubmenuId}`;
const moreButtonId = `#${selectors.moreButtonId}`;
const playId = `#${selectors.playId}`;
const playVideoId = `#${selectors.playVideoId}`;
const hdId = `#${selectors.hdId}`;

describe('Popup in ToolbarMenu', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, moreButtonId);
  });

  it('Submenu can be opened using mouse', async () => {
    // opens menu
    await e2e.clickOn(moreButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(playId);
    await e2e.exists(toolbarMenuSubmenuId);
  });

  it('Submenu can be opened using keyboard', async () => {
    // focuses menu button
    await e2e.waitForSelectorAndPressKey(moreButtonId, 'Tab');

    // opens menu
    await e2e.waitForSelectorAndPressKey(moreButtonId, 'Enter');
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.waitForSelectorAndPressKey(toolbarMenuId, 'Enter');
    await e2e.exists(toolbarMenuSubmenuId);
  });

  it('Submenu should be closed when clicking on some item that does not have submenu', async () => {
    // opens menu
    await e2e.clickOn(moreButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(playId);
    await e2e.exists(toolbarMenuSubmenuId);

    // opens second submenu
    await e2e.clickOn(playVideoId);
    await e2e.exists(hdId);

    // closes all menus
    await e2e.clickOn(hdId);

    await e2e.expectHidden(toolbarMenuId);
    await e2e.expectHidden(toolbarMenuSubmenuId);
  });

  it('Submenu should be closed when pressing enter/space on some item that does not have submenu', async () => {
    // focuses menu button
    await e2e.waitForSelectorAndPressKey(moreButtonId, 'Tab');

    // opens menu
    await e2e.waitForSelectorAndPressKey(moreButtonId, 'Enter');
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.waitForSelectorAndPressKey(toolbarMenuId, 'Enter');
    await e2e.exists(toolbarMenuSubmenuId);

    // closes all menus
    await e2e.waitForSelectorAndPressKey(toolbarMenuSubmenuId, 'Enter');
    await e2e.expectHidden(toolbarMenuId);
    await e2e.expectHidden(toolbarMenuSubmenuId);
  });
});
