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
    expect(await e2e.exists(toolbarMenuId)).toBe(true);

    // opens submenu
    await e2e.clickOn(playId);

    expect(await e2e.exists(toolbarMenuSubmenuId)).toBe(true);
  });

  it('Submenu can be opened using keyboard', async () => {
    // focuses menu button
    await e2e.pressKey('Tab');

    // opens menu
    await e2e.pressKey('Enter');
    expect(await e2e.exists(toolbarMenuId)).toBe(true);

    // opens submenu
    await e2e.pressKey('Enter');

    expect(await e2e.exists(toolbarMenuSubmenuId)).toBe(true);
  });

  it('Submenu should be closed when clicking on some item that does not have submenu', async () => {
    // opens menu
    await e2e.clickOn(moreButtonId);
    expect(await e2e.exists(toolbarMenuId)).toBe(true);

    // opens submenu
    await e2e.clickOn(playId);

    expect(await e2e.exists(toolbarMenuSubmenuId)).toBe(true);

    // opens second submenu
    await e2e.clickOn(playVideoId);

    expect(await e2e.exists(hdId)).toBe(true);

    // closes all menus
    await e2e.clickOn(hdId);

    expect(await e2e.exists(toolbarMenuId)).toBe(false);
    expect(await e2e.exists(toolbarMenuSubmenuId)).toBe(false);
  });

  it('Submenu should be closed when pressing enter/space on some item that does not have submenu', async () => {
    // focuses menu button
    await e2e.pressKey('Tab');

    // opens menu
    await e2e.pressKey('Enter');
    expect(await e2e.exists(toolbarMenuId)).toBe(true);

    // opens submenu
    await e2e.pressKey('Enter');

    expect(await e2e.exists(toolbarMenuSubmenuId)).toBe(true);

    // closes all menus
    await e2e.pressKey('Enter');

    expect(await e2e.exists(toolbarMenuId)).toBe(false);
    expect(await e2e.exists(toolbarMenuSubmenuId)).toBe(false);
  });
});
