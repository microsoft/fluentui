import { selectors } from './dialogInDialog-example';

const outerClose = `#${selectors.outerClose}`;
const outerHeader = `#${selectors.outerHeader}`;
const outerOverlay = `#${selectors.outerOverlay}`;
const outerTrigger = `#${selectors.outerTrigger}`;
const innerClose = `#${selectors.innerClose}`;
const innerHeader = `#${selectors.innerHeader}`;
const innerTrigger = `#${selectors.innerTrigger}`;
const innerOverlay = `#${selectors.innerOverlay}`;

// https://github.com/microsoft/fluent-ui-react/issues/1674
describe('Dialog in Dialog', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, outerTrigger);
  });

  it('An outer "Dialog" should be open after inner "Dialog" will be opened', async () => {
    await e2e.clickOn(outerTrigger);
    expect(await e2e.exists(outerHeader)).toBe(true);

    await e2e.clickOn(innerTrigger);
    expect(await e2e.exists(outerHeader)).toBe(true);
    expect(await e2e.exists(innerHeader)).toBe(true);
  });

  it('A click inside inner "Dialog" should not close dialogs', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);
    await e2e.clickOn(innerHeader);

    expect(await e2e.exists(outerHeader)).toBe(true);
    expect(await e2e.exists(innerHeader)).toBe(true);
  });

  it('A click on overlay should close only the last opened "Dialog"', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);

    await e2e.clickOnPosition(innerOverlay, 0, 0);

    expect(await e2e.exists(outerHeader)).toBe(true);
    expect(await e2e.exists(innerHeader)).toBe(false);

    await e2e.clickOnPosition(outerOverlay, 0, 0);
    expect(await e2e.exists(outerHeader)).toBe(false);
    expect(await e2e.exists(innerHeader)).toBe(false);
  });

  it('A click on cancel button should close only matching "Dialog"', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);

    await e2e.clickOn(innerClose);
    expect(await e2e.exists(outerHeader)).toBe(true);
    expect(await e2e.exists(innerHeader)).toBe(false);

    await e2e.clickOn(outerClose);
    expect(await e2e.exists(outerHeader)).toBe(false);
    expect(await e2e.exists(innerHeader)).toBe(false);
  });

  it('A click on content and pressing ESC button should close the last opened dialog', async () => {
    await e2e.clickOn(outerTrigger); // opens dialog
    expect(await e2e.exists(outerHeader)).toBe(true);

    await e2e.clickOn(innerTrigger); // opens nested dialog
    expect(await e2e.exists(innerHeader)).toBe(true);

    await e2e.clickOn(innerHeader);

    // check that focus moved to body after clicking on Dialog content
    expect(await e2e.isFocused('body')).toBe(true);

    // press ESC and check if nested dialog is closed and focus is on nested trigger
    await e2e.pressKey('Escape');
    expect(await e2e.exists(innerHeader)).toBe(false);
    expect(await e2e.isFocused(innerTrigger)).toBe(true);

    // click on dialog content to move focus to body
    await e2e.clickOn(outerHeader);
    expect(await e2e.isFocused('body')).toBe(true);

    // press ESC again and check if the last dialog is closed and focus is on trigger
    await e2e.pressKey('Escape');
    expect(await e2e.exists(outerHeader)).toBe(false);
    expect(await e2e.isFocused(outerTrigger)).toBe(true);
  });
});
