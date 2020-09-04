import { selectors } from './popupWithCloseInContent-example';

const popupTrigger = `#${selectors.popupTriggerId}`;
const popupContent = `#${selectors.popupContentId}`;
const popupClose = `#${selectors.popupCloseId}`;

describe('Popup With Close in the content and hover trigger', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  xit('A click on content should not close popup, a click button should close popup', async () => {
    await e2e.hover(popupTrigger); // opens popup
    expect(await e2e.exists(popupContent)).toBe(true);

    expect(await e2e.exists(popupContent)).toBe(true);
    await e2e.clickOn(popupClose);
    expect(await e2e.exists(popupContent)).toBe(false);
  });
});
