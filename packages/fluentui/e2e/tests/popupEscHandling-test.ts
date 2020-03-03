import { selectors } from './popupEscHandling-example';

const popupTrigger = `#${selectors.popupTriggerId}`;
const popupContent = `.${selectors.popupContentClass}`;
const dropdownTriggerButton = `.${selectors.dropdownTriggerClass}`;

// https://github.com/microsoft/fluent-ui-react/issues/1079
describe('Popup - on ESC key press', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('is not closed if ESC is handled by children', async () => {
    await e2e.clickOn(popupTrigger);

    await e2e.clickOn(dropdownTriggerButton); // opens dropdown list
    await e2e.pressKey('Escape'); // closes dropdown list

    expect(await e2e.isFocused(dropdownTriggerButton)).toBe(true);
    expect(await e2e.exists(popupContent)).toBe(true);
  });
});
