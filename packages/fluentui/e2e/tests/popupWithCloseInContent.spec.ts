describe('Popup With Close in the content and hover trigger', () => {
  const selectors = {
    popupContentId: 'popup-content-id',
    popupTriggerId: 'popup-trigger-id',
    popupCloseId: 'popup-close',
  };

  const popupTrigger = `#${selectors.popupTriggerId}`;
  const popupContent = `#${selectors.popupContentId}`;
  const popupClose = `#${selectors.popupCloseId}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, popupTrigger);
  });

  it('When opened by hover, a click on content should not close popup, a click button should close popup', () => {
    cy.hoverOn(popupTrigger);
    cy.visible(popupContent);

    cy.clickOn(popupContent);
    cy.visible(popupContent);

    cy.clickOn(popupClose);
    cy.notExist(popupContent);
  });

  it('When opened by hover & click, should be kept it opened on content click', () => {
    cy.hoverOn(popupTrigger);
    cy.visible(popupContent);

    cy.clickOn(popupTrigger);
    cy.isFocused(popupTrigger);
    cy.visible(popupContent);

    cy.clickOn(popupContent);
    cy.visible(popupContent);
  });
});
