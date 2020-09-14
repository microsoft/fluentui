import { selectors } from './popupClickHandling-example';

const popupTrigger = `#${selectors.triggerButtonId}`;
const popupContent = `.${selectors.popupContentClass}`;
const popupContentButton = `#${selectors.popupContentButtonId}`;

// https://github.com/microsoft/fluent-ui-react/issues/1324
describe('Popup - on content click', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('is not closed if an element inside disappeared', async () => {
    await e2e.clickOn(popupTrigger); // opens popup
    await e2e.clickOn(popupContentButton); // clicks on button in popup

    // button disappears from popup content
    await e2e.expectHidden(popupContentButton);

    // but popup content itself remains to be opened
    await e2e.exists(popupContent);
  });
});
