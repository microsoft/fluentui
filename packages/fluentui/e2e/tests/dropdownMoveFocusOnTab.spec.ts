describe('Dropdown', () => {
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
  const selectors: any = {
    previousFocusableSibling: 'previous-focusable-sibling',
    nextFocusableSibling: 'next-focusable-sibling',
    triggerButtonClass: 'ui-dropdown__trigger-button',
    listItem: 'ui-dropdown__item',
  };
  const inputItems = [
    'Robert Tolbert',
    'Wanda Howard',
    'Tim Deboer',
    'Amanda Brady',
    'Ashley McCarthy',
    'Cameron Evans',
    'Carlos Slattery',
    'Carole Poland',
    'Robin Counts',
  ];

  const triggerButton = `.${selectors.triggerButtonClass}`;
  const nextFocusableSibling = `#${selectors.nextFocusableSibling}`;
  const previousFocusableSibling = `#${selectors.previousFocusableSibling}`;
  const listItem = `.${selectors.listItem}`;
  const list = `.${dropdownSlotClassNames.itemsList}`;
  describe('Focus behavior', () => {
    beforeEach(() => {
      cy.gotoTestCase(__filename, triggerButton);
    });

    it('moves focus to next element on Tab', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab'); // TAB from opened dropdown list

      cy.isFocused(nextFocusableSibling);
    });

    it('moves focus to previous element on Shift-Tab', () => {
      cy.focusOn(triggerButton);

      cy.waitForSelectorAndPressKey(triggerButton, '{downarrow}'); // open dropdown list
      cy.waitForSelectorAndPressKey(list, 'Tab', 'Shift'); // Shift+TAB from opened dropdown list

      cy.isFocused(previousFocusableSibling);
    });

    it('closes dropdown on outside click', () => {
      cy.clickOn(triggerButton);
      cy.expectCount(listItem, inputItems.length);

      cy.clickOn(previousFocusableSibling);
      cy.expectCount(listItem, 0);
    });
  });
});
