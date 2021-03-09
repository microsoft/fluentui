describe('Dropdown', () => {
  const selectors: any = { triggerButtonClass: 'ui-dropdown__trigger-button' };
  const dropdownSlotClassNames: any = {
    clearIndicator: 'ui-dropdown__clear-indicator',
    container: 'ui-dropdown__container',
    toggleIndicator: 'ui-dropdown__toggle-indicator',
    item: 'ui-dropdown__item',
    itemsList: 'ui-dropdown__items-list',
    searchInput: 'ui-dropdown__searchinput',
    selectedItem: 'ui-dropdown__selecteditem',
    selectedItems: 'ui-dropdown__selected-items',
    triggerButton: 'ui-dropdown__trigger-button',
  };

  const triggerButton = `.${selectors.triggerButtonClass}`;
  const list = `.${dropdownSlotClassNames.itemsList}`;
  describe('Focus behavior', () => {
    beforeEach(() => {
      cy.gotoTestCase(__filename, triggerButton);
    });

    it('keeps focused on TAB from the dropdown list', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab'); // TAB from opened dropdown list

      cy.isFocused(triggerButton);
    });

    it('keeps focused on Shift+TAB from the dropdown list', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab', 'Shift'); // Shift+TAB from opened dropdown list

      cy.isFocused(triggerButton);
    });
  });
});
