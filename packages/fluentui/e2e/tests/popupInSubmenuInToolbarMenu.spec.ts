describe('Popup in ToolbarMenu', () => {
  const selectors = {
    toolbarMenuId: 'toolbarMenu',
    menuButtonId: 'menuButton',
    popupTriggerId: 'popupTrigger',
    popupElementId: 'popupElement',
    submenuTriggerId: 'submenuTrigger',
    dummyButtonId: 'dummyButton',
  };

  const toolbarMenuId = `#${selectors.toolbarMenuId}`;
  const menuButtonId = `#${selectors.menuButtonId}`;
  const popupTriggerId = `#${selectors.popupTriggerId}`;
  const submenuTriggerId = `#${selectors.submenuTriggerId}`;
  const popupElementId = `#${selectors.popupElementId}`;
  const dummyButtonId = `#${selectors.dummyButtonId}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, menuButtonId);
  });

  it('Popup can be opened using mouse', () => {
    // opens menu
    cy.clickOn(menuButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(submenuTriggerId);
    cy.visible(popupTriggerId);

    // opens Popup
    cy.clickOn(popupTriggerId);
    cy.visible(popupElementId);
  });

  it('Popup can be opened using keyboard', () => {
    // focuses menu button
    cy.waitForSelectorAndPressKey(menuButtonId, 'Tab');

    // opens menu
    cy.waitForSelectorAndPressKey(menuButtonId, '{enter}');
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.waitForSelectorAndPressKey(toolbarMenuId, '{enter}');
    cy.visible(popupTriggerId);

    // opens Popup
    cy.waitForSelectorAndPressKey(popupTriggerId, '{enter}');
    cy.visible(popupElementId);
  });

  it('Opening Popup results in first element to be focused', () => {
    // opens menu
    cy.clickOn(menuButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(submenuTriggerId);
    cy.visible(popupTriggerId);

    // opens Popup
    cy.clickOn(popupTriggerId);
    cy.isFocused(popupElementId);
  });

  it('Tab when Popup is focused does not result in hiding the Popup', () => {
    // opens menu
    cy.clickOn(menuButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(submenuTriggerId);
    cy.visible(popupTriggerId);

    // opens Popup
    cy.clickOn(popupTriggerId);
    cy.waitForSelectorAndPressKey(popupTriggerId, 'Tab');
    cy.visible(popupElementId);
  });

  it('Click inside Popup does not hide Popup', () => {
    // opens menu
    cy.clickOn(menuButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(submenuTriggerId);
    cy.visible(popupTriggerId);

    // opens Popup
    cy.clickOn(popupTriggerId);
    cy.clickOn(popupElementId);
    cy.visible(popupElementId);
  });

  it('Popup is closed when clicking outside of menu and popup', () => {
    // opens menu
    cy.clickOn(menuButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(submenuTriggerId);
    cy.visible(popupTriggerId);

    // opens Popup
    cy.clickOn(popupTriggerId);
    cy.clickOn(dummyButtonId);
    cy.notExist(popupElementId);
    cy.notExist(popupTriggerId);
  });

  it('Click outside of Popup but inside of Menu closes Popup but leaves Menu open', () => {
    // opens menu
    cy.clickOn(menuButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(submenuTriggerId);
    cy.visible(popupTriggerId);

    // opens Popup
    cy.clickOn(popupTriggerId);
    cy.clickOn(popupTriggerId);
    cy.notExist(popupElementId);
    cy.visible(popupTriggerId);
  });
});
