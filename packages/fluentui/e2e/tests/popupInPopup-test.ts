import { selectors } from './popupInPopup-example';

const popupTrigger = `#${selectors.popupTriggerId}`;
const popupContent = `#${selectors.popupContentId}`;
const popupTriggerNested = `#${selectors.popupTriggerNestedId}`;
const popupContentNested = `#${selectors.popupContentNestedId}`;

describe('Popup in Popup', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('A click on content and pressing ESC button should close the last opened popup', async () => {
    await e2e.clickOn(popupTrigger); // opens popup
    await e2e.exists(popupContent);

    await e2e.clickOn(popupTriggerNested); // opens nested popup
    await e2e.exists(popupContentNested);

    await e2e.clickOn(popupContentNested);

    // check that focus moved to body after clicking on Popup content
    await e2e.isFocused('body');

    // press ESC and check if nested popup is closed and focus is on nested trigger
    await e2e.waitForSelectorAndPressKey(popupContentNested, 'Escape');
    await e2e.hidden(popupContentNested);
    await e2e.isFocused(popupTriggerNested);

    // click on popup content to move focus to body
    await e2e.clickOn(popupContent);
    await e2e.isFocused('body');

    // press ESC again and check if the last popup is closed and focus is on trigger
    await e2e.waitForSelectorAndPressKey(popupContent, 'Escape');
    await e2e.hidden(popupContent);
    await e2e.isFocused(popupTrigger);
  });
});
