describe('Popup without `trigger`', () => {
  const selectors = { popupContent: 'ui-popup__content', button: 'ui-button' };
  const button = `.${selectors.button}`;
  const popupContent = `.${selectors.popupContent}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, button);
  });

  it('Popup can be opened on button click', () => {
    cy.clickOn(button);
    cy.visible(popupContent);
  });

  it('Popup can be closed on button click', () => {
    cy.clickOn(button);
    cy.visible(popupContent);

    cy.clickOn(button);
    cy.notExist(popupContent);
  });

  it('Popup can be closed on click outside', () => {
    cy.clickOn(button);
    cy.visible(popupContent);

    cy.clickOn('body');
    cy.notExist(popupContent);
  });

  it('Popup stays open on click inside', () => {
    cy.clickOn(button);
    cy.visible(popupContent);

    cy.clickOn(popupContent);
    cy.visible(popupContent);
  });
});
