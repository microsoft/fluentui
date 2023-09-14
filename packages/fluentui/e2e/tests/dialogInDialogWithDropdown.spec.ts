describe('Dialog in Dialog', () => {
  const selectors = {
    outerClose: 'outer-close',
    outerHeader: 'outer-header',
    outerTrigger: 'outer-trigger',
    innerClose: 'inner-close',
    innerHeader: 'inner-header',
    innerTrigger: 'inner-trigger',
    dropdown: 'dropdown-id',
  };
  const dropdownSlotClassNames = {
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

  const outerHeader = `#${selectors.outerHeader}`;
  const outerTrigger = `#${selectors.outerTrigger}`;
  const innerHeader = `#${selectors.innerHeader}`;
  const innerTrigger = `#${selectors.innerTrigger}`;
  const dropdownSelector = `#${selectors.dropdown}`;
  const dropdownIndicator = `.${dropdownSlotClassNames.toggleIndicator}`;
  const dropdownList = `.${dropdownSlotClassNames.itemsList}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, outerTrigger);
  });

  it('Nested dialog should have dropdown', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);

    cy.visible(dropdownSelector);
  });

  it('Should not close any modal when ESC pressed inside dropdown', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);

    cy.clickOn(dropdownIndicator);
    cy.exist(dropdownList);
    // TODO this test was failling on timeout. Cypress was probably too fast and components weren't ready.
    cy.wait(50);
    cy.waitForSelectorAndPressKey(dropdownList, '{esc}');

    cy.visible(dropdownSelector);
    cy.visible(innerHeader);
    cy.exist(outerHeader);
  });

  it('Should modal with dropdown when ESC pressed outside dropdown', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);

    // TODO this test was failling on timeout. Cypress was probably too fast and components weren't ready.
    cy.wait(50);
    cy.clickOn(innerHeader);
    cy.waitForSelectorAndPressKey(innerHeader, '{esc}');

    cy.notExist(dropdownSelector);
    cy.notExist(innerHeader);
    cy.visible(outerHeader);
  });
});
