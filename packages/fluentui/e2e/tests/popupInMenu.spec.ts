// https://github.com/microsoft/fluent-ui-react/issues/557
describe('Popup of menu item', () => {
  const selectors = {
    menuId: 'menu',
    menuItemId: index => `menu-item-${index}`,
    popupContentClass: 'ui-popup__content',
    popupContentId: index => `popup-content-${index}`,
  };

  const menu = `#${selectors.menuId}`;

  const menuItem = (index: number) => `#${selectors.menuItemId(index)}`;
  const itemPopup = (index: number) => `#${selectors.popupContentId(index)}`;
  const popupContent = `.${selectors.popupContentClass}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, menu);
  });

  it('should close when another menu item is clicked', () => {
    cy.clickOn(menuItem(0));
    cy.expectCount(popupContent, 1);
    cy.visible(itemPopup(0));

    cy.clickOn(menuItem(1));
    cy.expectCount(popupContent, 1);
    cy.visible(itemPopup(1));

    cy.clickOn(menuItem(2));
    cy.expectCount(popupContent, 1);
    cy.visible(itemPopup(2));
  });

  it('open/close and navigate in menu by keyboard', () => {
    cy.focusOn(menuItem(3));
    cy.waitForSelectorAndPressKey(menuItem(3), '{enter}');
    cy.isFocused(itemPopup(3));

    cy.waitForSelectorAndPressKey(itemPopup(3), '{esc}'); // close the popup
    cy.isFocused(menuItem(3));

    cy.waitForSelectorAndPressKey(menuItem(3), '{leftarrow}'); // moves to previous menu item
    cy.isFocused(menuItem(2));

    cy.waitForSelectorAndPressKey(menuItem(2), '{leftarrow}'); // moves to previous menu item
    cy.isFocused(menuItem(1));

    cy.waitForSelectorAndPressKey(menuItem(1), '{rightarrow}'); // moves to next menu item
    cy.isFocused(menuItem(2));
  });
});
