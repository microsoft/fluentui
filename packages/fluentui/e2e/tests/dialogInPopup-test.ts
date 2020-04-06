import { selectors } from './dialogInPopup-example';

const dialogCancel = `#${selectors.dialogCancel}`;
const dialogHeader = `.${selectors.dialogHeader}`;
const dialogOverlay = `.${selectors.dialogOverlay}`;
const dialogTrigger = `#${selectors.dialogTrigger}`;
const popupContent = `#${selectors.popupContent}`;
const popupTrigger = `#${selectors.popupTrigger}`;

// https://github.com/microsoft/fluent-ui-react/issues/1674
describe('Dialog in Popup', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('"Popup" should be open after "Dialog" will be opened', async () => {
    await e2e.clickOn(popupTrigger);
    expect(await e2e.exists(popupContent)).toBe(true);

    await e2e.clickOn(dialogTrigger);
    expect(await e2e.exists(popupContent)).toBe(true);
    expect(await e2e.exists(dialogHeader)).toBe(true);
  });

  it('"Popup" should be open after "Dialog" will be closed', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(dialogTrigger);
    await e2e.clickOn(dialogCancel);

    expect(await e2e.exists(popupContent)).toBe(true);
    expect(await e2e.exists(dialogHeader)).toBe(false);
  });

  it('"Popup" and "Dialog" will be kept open on a click inside "Dialog"', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(dialogTrigger);
    await e2e.clickOn(dialogHeader);

    expect(await e2e.exists(popupContent)).toBe(true);
    expect(await e2e.exists(dialogHeader)).toBe(true);
  });

  it('"Popup" will be kept open on a click inside "Dialog" overlay', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(dialogTrigger);
    await e2e.clickOnPosition(dialogOverlay, 0, 0);

    expect(await e2e.exists(popupContent)).toBe(true);
    expect(await e2e.exists(dialogHeader)).toBe(false);
  });

  it('A click on content and pressing ESC button should close the first opened dialog', async () => {
    await e2e.clickOn(popupTrigger); // opens popup
    await e2e.clickOn(dialogTrigger); // opens dialog

    expect(await e2e.exists(popupContent)).toBe(true);
    expect(await e2e.exists(dialogHeader)).toBe(true);

    await e2e.clickOn(dialogHeader);

    // check that focus moved to body after clicking on Dialog content
    expect(await e2e.isFocused('body')).toBe(true);

    // press ESC and check if nested popup is closed and focus is on nested trigger
    await e2e.pressKey('Escape');
    expect(await e2e.exists(dialogHeader)).toBe(false);
    expect(await e2e.isFocused(dialogTrigger)).toBe(true);

    // click on popup content to move focus to body
    await e2e.clickOn(popupContent);
    expect(await e2e.isFocused('body')).toBe(true);

    // press ESC again and check if the last popup is closed and focus is on trigger
    await e2e.pressKey('Escape');
    expect(await e2e.exists(popupContent)).toBe(false);
    expect(await e2e.isFocused(popupTrigger)).toBe(true);
  });
});
