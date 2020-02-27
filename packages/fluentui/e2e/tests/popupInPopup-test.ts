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
    expect(await e2e.exists(popupContent)).toBe(true);

    await e2e.clickOn(popupTriggerNested); // opens nested popup
    expect(await e2e.exists(popupContentNested)).toBe(true);

    await e2e.clickOn(popupContentNested);

    // check that focus moved to body after clicking on Popup content
    expect(await e2e.isFocused('body')).toBe(true);

    // press ESC and check if nested popup is closed and focus is on nested trigger
    await e2e.pressKey('Escape');
    expect(await e2e.exists(popupContentNested)).toBe(false);
    expect(await e2e.isFocused(popupTriggerNested)).toBe(true);

    // click on popup content to move focus to body
    await e2e.clickOn(popupContent);
    expect(await e2e.isFocused('body')).toBe(true);

    // press ESC again and check if the last popup is closed and focus is on trigger
    await e2e.pressKey('Escape');
    expect(await e2e.exists(popupContent)).toBe(false);
    expect(await e2e.isFocused(popupTrigger)).toBe(true);
  });
});
