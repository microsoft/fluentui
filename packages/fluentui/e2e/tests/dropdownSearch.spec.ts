describe('DropdownSearch', () => {
  const selectors = { input: '.ui-dropdown__searchinput__input' };
  beforeEach(() => {
    cy.gotoTestCase(__filename, selectors.input);
  });

  describe('cursor behavior on an input', () => {
    it('Home/End moves cursor', () => {
      cy.focusOn(selectors.input);

      cy.waitForSelectorAndPressKey(selectors.input, 'F');
      cy.waitForSelectorAndPressKey(selectors.input, 'O');

      cy.waitForSelectorAndPressKey(selectors.input, '{home}');
      cy.hasPropertyValue(selectors.input, 'selectionStart', 0);

      cy.waitForSelectorAndPressKey(selectors.input, '{end}');
      cy.hasPropertyValue(selectors.input, 'selectionStart', 2);
    });

    it('cursor position is preserved', () => {
      cy.focusOn(selectors.input);

      cy.waitForSelectorAndPressKey(selectors.input, 'F');
      cy.waitForSelectorAndPressKey(selectors.input, '{leftarrow}');
      cy.waitForSelectorAndPressKey(selectors.input, 'O');

      cy.hasPropertyValue(selectors.input, 'selectionStart', 1);
      cy.hasPropertyValue(selectors.input, 'value', 'OF');
    });
  });
});
