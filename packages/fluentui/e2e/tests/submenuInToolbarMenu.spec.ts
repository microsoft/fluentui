describe('Popup in ToolbarMenu', () => {
  const selectors = {
    toolbarMenuId: 'toolbarMenu',
    toolbarMenuSubmenuId: 'toolbarMenuSubmenu',
    moreButtonId: 'moreButton',
    playId: 'play',
    playVideoId: 'playVideo',
    hdId: 'hd',
  };

  const toolbarMenuId = `#${selectors.toolbarMenuId}`;
  const toolbarMenuSubmenuId = `#${selectors.toolbarMenuSubmenuId}`;
  const moreButtonId = `#${selectors.moreButtonId}`;
  const playId = `#${selectors.playId}`;
  const playVideoId = `#${selectors.playVideoId}`;
  const hdId = `#${selectors.hdId}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, moreButtonId);
  });

  it('Submenu can be opened using mouse', () => {
    // opens menu
    cy.clickOn(moreButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(playId);
    cy.visible(toolbarMenuSubmenuId);
  });

  it('Submenu can be opened using keyboard', () => {
    // focuses menu button
    cy.waitForSelectorAndPressKey(moreButtonId, 'Tab');

    // opens menu
    cy.waitForSelectorAndPressKey(moreButtonId, '{enter}');
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.waitForSelectorAndPressKey(toolbarMenuId, '{enter}');
    cy.visible(toolbarMenuSubmenuId);
  });

  it('Submenu should be closed when clicking on some item that does not have submenu', () => {
    // opens menu
    cy.clickOn(moreButtonId);
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.clickOn(playId);
    cy.visible(toolbarMenuSubmenuId);

    // opens second submenu
    cy.clickOn(playVideoId);
    cy.visible(hdId);

    // closes all menus
    cy.clickOn(hdId);

    cy.notExist(toolbarMenuId);
    cy.notExist(toolbarMenuSubmenuId);
  });

  it('Submenu should be closed when pressing enter/space on some item that does not have submenu', () => {
    // focuses menu button
    cy.waitForSelectorAndPressKey(moreButtonId, 'Tab');

    // opens menu
    cy.waitForSelectorAndPressKey(moreButtonId, '{enter}');
    cy.visible(toolbarMenuId);

    // opens submenu
    cy.waitForSelectorAndPressKey(toolbarMenuId, '{enter}');
    cy.visible(toolbarMenuSubmenuId);

    // closes all menus
    cy.waitForSelectorAndPressKey(toolbarMenuSubmenuId, '{enter}');
    cy.notExist(toolbarMenuId);
    cy.notExist(toolbarMenuSubmenuId);
  });
});
