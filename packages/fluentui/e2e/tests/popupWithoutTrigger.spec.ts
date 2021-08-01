describe('Popup without `trigger`', () => {
  const selectors = { popupContent: 'ui-popup__content', button: 'ui-button' };
  const button = `.${selectors.button}`;
  const popupContent = `.${selectors.popupContent}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, button);
  });

  it('Popup can be opened on button click', () => {
    cy.mouseDownOn(button);
    cy.visible(popupContent);
  });

  it('Popup can be closed on button click', () => {
    cy.mouseDownOn(button);
    cy.visible(popupContent);

    cy.mouseDownOn(button);
    cy.notExist(popupContent);
  });

  it('Popup can be closed on click outside', () => {
    cy.mouseDownOn(button);
    cy.visible(popupContent);

    cy.mouseDownOn('body');
    cy.notExist(popupContent);
  });

  it('Popup stays open on click inside', () => {
    cy.mouseDownOn(button);
    cy.visible(popupContent);

    cy.mouseDownOn(popupContent);
    cy.visible(popupContent);
  });
});
