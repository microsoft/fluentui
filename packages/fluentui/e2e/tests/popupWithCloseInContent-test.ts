import { selectors } from './popupWithCloseInContent-example';

const popupTrigger = `#${selectors.popupTriggerId}`;
const popupContent = `#${selectors.popupContentId}`;
const popupClose = `#${selectors.popupCloseId}`;

describe('Popup With Close in the content and hover trigger', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('When opened by hover, a click on content should not close popup, a click button should close popup', async () => {
    await e2e.hover(popupTrigger);
    await e2e.exists(popupContent);

    await e2e.clickOn(popupContent);
    await e2e.exists(popupContent);

    await e2e.clickOn(popupClose);
    await e2e.expectHidden(popupContent);
  });

  it('When opened by hover & click, should be kept it opened on content click', async () => {
    await e2e.hover(popupTrigger);
    await e2e.exists(popupContent);

    await e2e.clickOn(popupTrigger);
    await e2e.isFocused(popupTrigger);
    await e2e.exists(popupContent);

    await e2e.clickOn(popupContent);
    await e2e.exists(popupContent);
  });
});
