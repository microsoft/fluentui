describe('Dialog with dropdown', () => {
  const selectors: any = {
    dialogTrigger: 'outer-trigger',
    dropdown: 'dropdown-id',
    dialogClose: 'dialog-close',
    dialogHeader: 'header',
  };
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

  const dialogTrigger = `#${selectors.dialogTrigger}`;
  const dialogHeader = `#${selectors.dialogHeader}`;
  const dropdownSelector = `#${selectors.dropdown}`;
  const dropdownIndicator = `.${dropdownSlotClassNames.toggleIndicator}`;
  const dropdownList = `.${dropdownSlotClassNames.itemsList}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, dialogTrigger);
  });

  it('should render with dropdown', () => {
    cy.clickOn(dialogTrigger);
    cy.visible(dropdownSelector);
  });

  it('should not close dialog and keep focus on dropdown when pressing ESC', () => {
    cy.clickOn(dialogTrigger);
    cy.clickOn(dropdownIndicator);

    cy.exist(dropdownList);
    cy.waitForSelectorAndPressKey(dropdownList, '{esc}');
    cy.visible(dropdownSelector);
  });

  it('should close when ESC pressed in the dialog', () => {
    cy.clickOn(dialogTrigger);
    cy.clickOn(dropdownIndicator);

    cy.exist(dropdownList);
    cy.waitForSelectorAndPressKey(dropdownList, '{esc}');
    cy.visible(dropdownSelector);

    cy.clickOn(dialogHeader);
    cy.waitForSelectorAndPressKey(dialogHeader, '{esc}');
    cy.notExist(dropdownSelector);
  });

  it('should close when ESC pressed in the closed dropdown', () => {
    cy.clickOn(dialogTrigger); // open dialog
    cy.waitForSelectorAndPressKey(dropdownSelector, '{downarrow}'); // open list

    cy.waitForSelectorAndPressKey(dropdownList, '{esc}'); // closes list
    cy.waitForSelectorAndPressKey(dialogHeader, '{esc}'); // closes dialog
    cy.notExist(dropdownSelector);
    cy.notExist(dialogHeader);
  });
});
