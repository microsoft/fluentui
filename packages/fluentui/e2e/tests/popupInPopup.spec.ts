describe('Popup in Popup', () => {
  const selectors = {
    popupContentId: 'popup-content-id',
    popupTriggerId: 'popup-trigger-id',
    popupContentNestedId: 'popup-content-nested-id',
    popupTriggerNestedId: 'popup-trigger-nested-id',
  };
  const popupTrigger = `#${selectors.popupTriggerId}`;
  const popupContent = `#${selectors.popupContentId}`;
  const popupTriggerNested = `#${selectors.popupTriggerNestedId}`;
  const popupContentNested = `#${selectors.popupContentNestedId}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, popupTrigger);
  });

  it('A click on content and pressing ESC button should close the last opened popup', () => {
    cy.clickOn(popupTrigger); // opens popup
    cy.visible(popupContent);

    cy.clickOn(popupTriggerNested); // opens nested popup
    cy.visible(popupContentNested);

    cy.clickOn(popupContentNested);
    cy.wait(50);

    // check that focus moved to body after clicking on Popup content
    cy.nothingIsFocused();

    // press ESC and check if nested popup is closed and focus is on nested trigger
    cy.waitForSelectorAndPressKey(popupContentNested, '{esc}');
    cy.notExist(popupContentNested);
    cy.isFocused(popupTriggerNested);

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
