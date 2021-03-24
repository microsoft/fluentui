// https://github.com/microsoft/fluent-ui-react/issues/1324
describe('Popup - on content click', () => {
  const selectors = {
    triggerButtonId: 'trigger',
    popupContentClass: 'ui-popup__content',
    popupContentButtonId: 'content-button',
  };
  const popupTrigger = `#${selectors.triggerButtonId}`;
  const popupContent = `.${selectors.popupContentClass}`;
  const popupContentButton = `#${selectors.popupContentButtonId}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, popupTrigger);
  });

  it('is not closed if an element inside disappeared', () => {
    cy.clickOn(popupTrigger); // opens popup
    cy.clickOn(popupContentButton); // clicks on button in popup

    // button disappears from popup content
    cy.notExist(popupContentButton);

    // but popup content itself remains to be opened
    cy.visible(popupContent);
  });
});
