import { selectors } from './popupInToolbarMenu-example';

const toolbarMenuId = `.${selectors.toolbarMenu}`;
const menuButtonId = `#${selectors.menuButtonId}`;
const popupTriggerId = `#${selectors.popupTriggerId}`;
const popupElementId = `#${selectors.popupElementId}`;
const dummyButtonId = `#${selectors.dummyButtonId}`;

describe('Popup in ToolbarMenu', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuButtonId);
  });

  it('Popup can be opened using mouse', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.exists(popupElementId);
  });

  it('Popup can be opened using keyboard', async () => {
    // focuses menu button
    await e2e.pressKey('Tab');

    // opens menu
    await e2e.pressKey('Enter');
    await e2e.exists(toolbarMenuId);

    // opens Popup
    await e2e.pressKey('Enter');
    await e2e.exists(popupElementId);
  });

  it('Opening Popup results in first element to be focused', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.isFocused(popupElementId);
  });

  it('Tab when Popup is focused does not result in hiding the Popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.pressKey('Tab');
    await e2e.exists(popupElementId);
  });

  it('Click inside Popup does not hide Popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.clickOn(popupElementId);
    await e2e.exists(popupElementId);
  });

  it('Popup is closed when clicking outside of menu and popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.clickOn(dummyButtonId);
    await e2e.hidden(popupElementId);
    await e2e.hidden(popupTriggerId);
  });

  it('Click outside of Popup but inside of Menu closes Popup but leaves Menu open', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.clickOn(popupTriggerId);
    await e2e.hidden(popupElementId);
    await e2e.exists(popupTriggerId);
  });
});
