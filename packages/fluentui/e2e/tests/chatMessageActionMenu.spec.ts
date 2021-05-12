describe('Chat message with action menu rendered outside', () => {
  const selectors = {
    menuClassName: '.ui-menu',
    chatMessageClassName: '.ui-chat__message',
    likeIcon: '.likeIcon',
    moreIcon: '.moreIcon',
    moreActionMenu: '.moreActionMenu',
  };

  beforeEach(() => {
    cy.gotoTestCase(__filename, selectors.chatMessageClassName);
  });

  it('Can navigate to action menu and back through keyboard', () => {
    cy.get(selectors.chatMessageClassName).each(chatMessage => {
      chatMessage.trigger('focus'); // focus on chat message

      cy.get(selectors.menuClassName).should('be.visible');
      cy.get(`${selectors.likeIcon}`).should('be.visible');
      cy.get(`${selectors.moreIcon}`).should('be.visible');

      cy.realPress('{enter}'); // focus on 1st item in action menu
      cy.isFocused(selectors.likeIcon);

      cy.realPress('{rightarrow}'); // navigate to 2nd item in action menu
      cy.isFocused(selectors.moreIcon);

      cy.realPress('{enter}'); // open submenu from action menu moreIcon
      cy.isFocused(`${selectors.moreActionMenu} > li:nth-child(1) > a`); // focus on the 1st item when menu open
      cy.realPress('{esc}'); // close submenu
      cy.isFocused(selectors.moreIcon);

      cy.realPress('{leftarrow}'); // navigate back to 1st item in action menu
      cy.isFocused(selectors.likeIcon);

      cy.realPress('{esc}'); // navigate back to chat message
      cy.isFocused(selectors.chatMessageClassName);
    });
  });
});
