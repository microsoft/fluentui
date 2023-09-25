describe('Popup without `trigger`', () => {
  const selectors = { popupContent: 'ui-popup__content', button: 'ui-button' };
  const button = `.${selectors.button}`;
  const popupContent = `.${selectors.popupContent}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, button);
  });

  it('Popup still open on mousedown event', () => {
    cy.clickOn(button);
    cy.get(popupContent).trigger('mousedown', { which: 1 }).trigger('mousemove', { clientX: 300, clientY: 300 });
    cy.visible(popupContent);
  });
});
