import { popupContentClassName } from '@fluentui/react-northstar';

const buttonInPopup = '#button-in-popup';
const menu = '.ms-ContextualMenu-Callout';
const menuTrigger = '#menu-trigger';
const outside = '#outside';
const popupContent = `.${popupContentClassName}`;
const popupTrigger = '#popup-trigger';

describe('Fabric Layer in Popup', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, popupTrigger);
  });

  it('opens a Popup and then a Menu', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.exists(popupContent);
    await e2e.expectHidden(menu);

    await e2e.clickOn(menuTrigger);
    await e2e.exists(popupContent);
    await e2e.exists(menu);
  });

  it('closes both on an outside click', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(menuTrigger);
    await e2e.exists(popupContent);
    await e2e.exists(menu);

    await e2e.clickOn(outside);
    await e2e.expectHidden(popupContent);
    await e2e.expectHidden(menu);
  });

  it('closes a Menu on click inside Popup', async () => {
    await e2e.clickOn(popupTrigger);
    await e2e.clickOn(menuTrigger);
    await e2e.exists(popupContent);
    await e2e.exists(menu);

    await e2e.clickOn(buttonInPopup);
    await e2e.exists(popupContent);
    await e2e.expectHidden(menu);
  });
});
