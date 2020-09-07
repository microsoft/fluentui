import { selectors } from './popupClickHandling-example';

const popupTrigger = `#${selectors.triggerButtonId}`;
const popupContent = `.${selectors.popupContentClass}`;
const popupContentButton = `#${selectors.popupContentButtonId}`;
const popupContentContainer = `#${selectors.popupContentContainerId}`;

// https://github.com/microsoft/fluent-ui-react/issues/1324
describe('Popup - on content click', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('is not closed if ESC is handled by children', async () => {
    await e2e.clickOn(popupTrigger); // opens popup
    await e2e.clickOn(popupContentButton); // clicks on button in popup

    // button disappears from popup content
    expect(await e2e.exists(popupContentButton)).toBe(false);

    // but popup content itself remains to be opened
    expect(await e2e.exists(popupContent)).toBe(true);
  });

  it('should keep it open on content click', async () => {
    await e2e.hover(popupTrigger); // opens popup
    await e2e.clickOn(popupTrigger); // clicks setting focus on trigger ( should keep open )

    await e2e.clickOn(popupContentContainer); // clicks on the container (focus goes to body but still open)
    await e2e.isFocused('body')

    // popup should be open
    expect(await e2e.exists(popupContent)).toBe(true);

    await e2e.focusOn(popupTrigger); // move focus back to trigger
  });
});
