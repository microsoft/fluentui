import { selectors } from './popupWithoutTrigger-example';

const button = `.${selectors.button}`;
const popupContent = `.${selectors.popupContent}`;

describe('Popup without `trigger`', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, button);
  });

  it('Popup can be opened on button click', async () => {
    await e2e.clickOn(button);
    await e2e.exists(popupContent);
  });

  it('Popup can be closed on button click', async () => {
    await e2e.clickOn(button);
    await e2e.exists(popupContent);

    await e2e.clickOn(button);
    await e2e.expectHidden(popupContent);
  });

  it('Popup can be closed on click outside', async () => {
    await e2e.clickOn(button);
    await e2e.exists(popupContent);

    await e2e.clickOn('body');
    await e2e.expectHidden(popupContent);
  });

  it('Popup stays open on click inside', async () => {
    await e2e.clickOn(button);
    await e2e.exists(popupContent);

    await e2e.clickOn(popupContent);
    await e2e.exists(popupContent);
  });
});
