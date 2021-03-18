describe('Dialog in Popup', () => {
  const selectors = {
    dialogCancel: 'dialog-cancel',
    dialogHeader: 'ui-dialog__header',
    dialogTrigger: 'dialog-trigger',
    popupContent: 'popup-content',
    popupTrigger: 'popup-trigger',
    overlayPoint: 'overlay-point',
  };

  const dialogCancel = `#${selectors.dialogCancel}`;
  const dialogHeader = `.${selectors.dialogHeader}`;
  const dialogTrigger = `#${selectors.dialogTrigger}`;
  const popupContent = `#${selectors.popupContent}`;
  const popupTrigger = `#${selectors.popupTrigger}`;
  const overlayPoint = `#${selectors.overlayPoint}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, popupTrigger);
  });

  it('"Popup" should be open after "Dialog" will be opened', () => {
    cy.clickOn(popupTrigger);
    cy.visible(popupContent);

    cy.clickOn(dialogTrigger);
    cy.wait(50);
    cy.visible(popupContent);
    cy.visible(dialogHeader);
  });

  it('"Popup" should be open after "Dialog" will be closed', () => {
    cy.clickOn(popupTrigger);
    cy.clickOn(dialogTrigger);
    cy.wait(50);
    cy.clickOn(dialogCancel);

    cy.visible(popupContent);
    cy.notExist(dialogHeader);
  });

  it('"Popup" and "Dialog" will be kept open on a click inside "Dialog"', () => {
    cy.clickOn(popupTrigger);
    cy.clickOn(dialogTrigger);
    cy.wait(50);
    cy.clickOn(dialogHeader);

    cy.visible(popupContent);
    cy.visible(dialogHeader);
  });

  it('"Popup" will be kept open on a click inside "Dialog" overlay', () => {
    cy.clickOn(popupTrigger);
    cy.clickOn(dialogTrigger);
    cy.wait(50);

    cy.visible(dialogHeader);
    cy.clickOn(overlayPoint);
    cy.visible(popupContent);
    cy.notExist(dialogHeader);
  });

  it('A click on content and pressing ESC button should close the first opened dialog', () => {
    cy.clickOn(popupTrigger); // opens popup
    cy.clickOn(dialogTrigger); // opens dialog
    cy.wait(50);

    cy.visible(popupContent);
    cy.visible(dialogHeader);

    cy.clickOn(dialogHeader);
    cy.wait(50);

    // check that focus moved to body after clicking on Dialog content
    cy.nothingIsFocused();

    // press ESC and check if nested popup is closed and focus is on nested trigger
    cy.waitForSelectorAndPressKey(popupContent, '{esc}');
    cy.wait(50);
    cy.notExist(dialogHeader);
    cy.isFocused(dialogTrigger);

    // click on popup content to move focus to body
    cy.clickOn(popupContent);
    cy.wait(50);
    cy.nothingIsFocused();

    // press ESC again and check if the last popup is closed and focus is on trigger
    cy.waitForSelectorAndPressKey(popupContent, '{esc}');
    cy.notExist(popupContent);
    cy.isFocused(popupTrigger);
  });
});
