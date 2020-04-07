import { selectors } from './dialogPreventScroll-example';

const outerClose = `#${selectors.outerClose}`;
const outerTrigger = `#${selectors.outerTrigger}`;
const innerClose = `#${selectors.innerClose}`;
const innerTrigger = `#${selectors.innerTrigger}`;

const hiddenOverflow = 'overflow: hidden';
const unsetOverflow = 'overflow: unset;';
const dialogsCounterAttribute = 'fluent-dialogs-count';

describe('Dialog scroll', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, outerTrigger);
  });

  it('should prevent scroll on the body when dialog is open', async () => {
    await e2e.clickOn(outerTrigger);
    const bodyStyles = await e2e.getAttributeValue('body', 'style');
    const bodyCounter = await e2e.getAttributeValue('body', dialogsCounterAttribute);
    expect(bodyStyles).toContain(hiddenOverflow);
    expect(bodyCounter).toBe('1');
  });

  it('should increment the dialogs counter in the body attribute', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);
    const bodyStyles = await e2e.getAttributeValue('body', 'style');
    const bodyCounter = await e2e.getAttributeValue('body', dialogsCounterAttribute);
    expect(bodyStyles).toContain(hiddenOverflow);
    expect(bodyCounter).toBe('2');
  });

  it('should decrement the dialogs counter in the body attribute', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);
    const bodyStyles = await e2e.getAttributeValue('body', 'style');
    const bodyCounter = await e2e.getAttributeValue('body', dialogsCounterAttribute);
    expect(bodyStyles).toContain(hiddenOverflow);
    expect(bodyCounter).toBe('2');
    await e2e.clickOn(innerClose);
    const bodyCounterAfterCloseInner = await e2e.getAttributeValue('body', dialogsCounterAttribute);
    expect(bodyCounterAfterCloseInner).toBe('1');
  });

  it('should reset overflow and reset the dialogs counter', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);
    const bodyStyles = await e2e.getAttributeValue('body', 'style');
    const bodyCounter = await e2e.getAttributeValue('body', dialogsCounterAttribute);
    expect(bodyStyles).toContain(hiddenOverflow);
    expect(bodyCounter).toBe('2');
    await e2e.clickOn(innerClose);
    await e2e.clickOn(outerClose);
    const bodyStylesAfterCloseInner = await e2e.getAttributeValue('body', 'style');
    expect(bodyStylesAfterCloseInner).toBe(unsetOverflow);
  });
});
