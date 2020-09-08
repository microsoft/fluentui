import { selectors } from './dialogPreventScroll-example';

const outerClose = `#${selectors.outerClose}`;
const outerTrigger = `#${selectors.outerTrigger}`;
const innerClose = `#${selectors.innerClose}`;
const innerTrigger = `#${selectors.innerTrigger}`;

describe('Dialog scroll', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, outerTrigger);
  });

  it('should prevent scroll on the body when dialog is open', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.exists(outerClose);
    await e2e.hasComputedStyle('body', 'overflow', 'hidden');
  });

  it('should prevent scroll on the body when nested dialog is open', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);
    await e2e.exists(innerClose);
    await e2e.hasComputedStyle('body', 'overflow', 'hidden');
  });

  it('should prevent scroll on the body when nested dialog is closed', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);
    await e2e.exists(innerClose);
    await e2e.hasComputedStyle('body', 'overflow', 'hidden');

    await e2e.clickOn(innerClose);
    await e2e.hidden(innerClose);
  });

  it('should reset overflow', async () => {
    await e2e.clickOn(outerTrigger);
    await e2e.clickOn(innerTrigger);
    await e2e.hasComputedStyle('body', 'overflow', 'hidden');

    await e2e.clickOn(innerClose);
    await e2e.clickOn(outerClose);
    await e2e.hasComputedStyle('body', 'overflow', 'visible');
  });
});
