describe('Fabric Layer in Popup', () => {
  const buttonInPopup = '#button-in-popup';
  const menu = '.ms-ContextualMenu-Callout';
  const menuTrigger = '#menu-trigger';
  const outside = '#outside';
  const popupContent = '.ui-popup__content';
  const popupTrigger = '#popup-trigger';

  beforeEach(() => {
    cy.gotoTestCase(__filename, popupTrigger);
  });

  it('opens a Popup and then a Menu', () => {
    cy.clickOn(popupTrigger);
    cy.visible(popupContent);
    cy.notVisible(menu);

    cy.clickOn(menuTrigger);
    cy.visible(popupContent);
    cy.visible(menu);
  });

  it('closes both on an outside click', () => {
    cy.clickOn(popupTrigger);
    cy.clickOn(menuTrigger);
    cy.visible(popupContent);
    cy.visible(menu);

    cy.clickOn(outside);
    cy.notExist(popupContent);
    cy.notExist(menu);
  });

  it('closes a Menu on click inside Popup', () => {
    cy.clickOn(popupTrigger);
    cy.clickOn(menuTrigger);
    cy.visible(popupContent);
    cy.visible(menu);

    cy.clickOn(buttonInPopup);
    cy.visible(popupContent);
    cy.notVisible(menu);
  });
});
