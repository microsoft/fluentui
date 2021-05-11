describe('Chat message with action menu rendered outside', () => {
  const selectors = {
    menuClassName: '.ui-menu',
    chatMessageClassName: '.ui-chat__message',
    likeIcon: '.likeIcon',
    moreIcon: '.moreIcon',
  };

  beforeEach(() => {
    cy.gotoTestCase(__filename, selectors.chatMessageClassName);
  });

  it('Can navigate to action menu and back', () => {
    cy.get(selectors.chatMessageClassName).each(chatMessage => {
      chatMessage.trigger('focus');

      cy.get(selectors.menuClassName).should('be.visible');
      cy.get(`${selectors.likeIcon}`).should('be.visible');
      cy.get(`${selectors.moreIcon}`).should('be.visible');

      cy.realPress('{enter}');
      cy.isFocused(selectors.likeIcon);

      cy.realPress('{rightarrow}');
      cy.isFocused(selectors.moreIcon);
      cy.realPress('{leftarrow}');
      cy.isFocused(selectors.likeIcon);

      cy.realPress('{esc}');
      cy.isFocused(selectors.chatMessageClassName);
    });
  });
});
