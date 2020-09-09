import { selectors } from './popupEscHandling-example';

const popupTrigger = `#${selectors.popupTriggerId}`;
const popupContent = `.${selectors.popupContentClass}`;
const dropdownTriggerButton = `.${selectors.dropdownTriggerClass}`;
const dropdownList = `.${selectors.dropdownListClass}`;

// https://github.com/microsoft/fluent-ui-react/issues/1079
describe('Popup - on ESC key press', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('is not closed if ESC is handled by children', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.exists(popupContent);

    await e2e.clickOn(dropdownTriggerButton); // opens dropdown list
    await e2e.exists(dropdownList);

    await e2e.waitForSelectorAndPressKey(dropdownList, 'Escape'); // closes dropdown list
    await e2e.exists(dropdownTriggerButton);
    await e2e.exists(popupContent);
    await e2e.isFocused(dropdownTriggerButton);
  });
});
