import { selectors } from './dialogInPopup-example';

const dialogCancel = `#${selectors.dialogCancel}`;
const dialogHeader = `.${selectors.dialogHeader}`;
const dialogTrigger = `#${selectors.dialogTrigger}`;
const popupContent = `#${selectors.popupContent}`;
const popupTrigger = `#${selectors.popupTrigger}`;
const overlayPoint = `#${selectors.overlayPoint}`;

// https://github.com/microsoft/fluent-ui-react/issues/1674
describe('Dialog in Popup', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('"Popup" should be open after "Dialog" will be opened', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.exists(popupContent);

    await e2e.clickOn(dialogTrigger);
    await e2e.exists(popupContent);
    await e2e.exists(dialogHeader);
  });

  it('"Popup" should be open after "Dialog" will be closed', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(dialogTrigger);
    await e2e.clickOn(dialogCancel);

    await e2e.exists(popupContent);
    await e2e.hidden(dialogHeader);
  });

  it('"Popup" and "Dialog" will be kept open on a click inside "Dialog"', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(dialogTrigger);
    await e2e.clickOn(dialogHeader);

    await e2e.exists(popupContent);
    await e2e.exists(dialogHeader);
  });

  it('"Popup" will be kept open on a click inside "Dialog" overlay', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(dialogTrigger);

    await e2e.clickOn(overlayPoint);
    await e2e.exists(popupContent);
    await e2e.hidden(dialogHeader);
  });

  it('A click on content and pressing ESC button should close the first opened dialog', async () => {
    await e2e.clickOn(popupTrigger); // opens popup
    await e2e.clickOn(dialogTrigger); // opens dialog

    await e2e.exists(popupContent);
    await e2e.exists(dialogHeader);

    await e2e.clickOn(dialogHeader);

    // check that focus moved to body after clicking on Dialog content
    await e2e.isFocused('body');

    // press ESC and check if nested popup is closed and focus is on nested trigger
    await e2e.pressKey('Escape');
    await e2e.hidden(dialogHeader);
    await e2e.isFocused(dialogTrigger);

    // click on popup content to move focus to body
    await e2e.clickOn(popupContent);
    await e2e.isFocused('body');

    // press ESC again and check if the last popup is closed and focus is on trigger
    await e2e.pressKey('Escape');
    await e2e.hidden(popupContent);
    await e2e.isFocused(popupTrigger);
  });
});
