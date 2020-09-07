import { selectors } from './popupInMenu-example';

const menu = `#${selectors.menuId}`;

const menuItem = (index: number) => `#${selectors.menuItemId(index)}`;
const itemPopup = (index: number) => `#${selectors.popupContentId(index)}`;
const popupContent = `.${selectors.popupContentClass}`;

// https://github.com/microsoft/fluent-ui-react/issues/557
describe('Popup of menu item', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menu);
  });

  it('should close when another menu item is clicked', async () => {
    await e2e.clickOn(menuItem(0));
    await e2e.count(popupContent, 1);
    await e2e.exists(itemPopup(0));

    await e2e.clickOn(menuItem(1));
    await e2e.count(popupContent, 1);
    await e2e.exists(itemPopup(1));

    await e2e.clickOn(menuItem(2));
    await e2e.count(popupContent, 1);
    await e2e.exists(itemPopup(2));
  });

  it('open/close and navigate in menu by keyboard', async () => {
    await e2e.focusOn(menuItem(3));
    await e2e.pressKey('Enter');
    await e2e.isFocused(itemPopup(3));

    await e2e.pressKey('Escape'); // close the popup
    await e2e.isFocused(menuItem(3));

    await e2e.pressKey('ArrowLeft'); // moves to previous menu item
    await e2e.isFocused(menuItem(2));

    await e2e.pressKey('ArrowLeft'); // moves to previous menu item
    await e2e.isFocused(menuItem(1));

    await e2e.pressKey('ArrowRight'); // moves to next menu item
    await e2e.isFocused(menuItem(2));
  });
});
