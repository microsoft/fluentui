describe('Chat message with action menu rendered outside', () => {
  const selectors = {
    menuClassName: '.ui-menu',
    chatClassName: '.ui-chat',
    chatItemClassName: '.ui-chat__item',
    chatMessageClassName: '.ui-chat__message',
    likeIcon: '.likeIcon',
    moreIcon: '.moreIcon',
    moreActionMenu: '.moreActionMenu',
  };

  const getChatMessageSelectorAt = index =>
    `${selectors.chatClassName} ${selectors.chatItemClassName}:nth-child(${index + 1}) ${
      selectors.chatMessageClassName
    }`;

  const getActionMenuAt = index => `${selectors.menuClassName}:nth-child(${index + 1})`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, selectors.chatMessageClassName);
  });

  it('Can navigate to action menu and back through keyboard', () => {
    const chatMessages = cy.get(selectors.chatMessageClassName);
    chatMessages.should('have.length', 2);

    [0, 1].forEach(index => {
      const chatMessage = getChatMessageSelectorAt(index);
      cy.focusOn(chatMessage);
      cy.isFocused(chatMessage);

      const actionMenu = getActionMenuAt(index);
      cy.get(actionMenu).should('be.visible');
      cy.get(`${actionMenu} ${selectors.likeIcon}`).should('be.visible');
      cy.get(`${actionMenu} ${selectors.moreIcon}`).should('be.visible');

      cy.realPress('{enter}'); // expect focus on 1st item in action menu
      cy.isFocused(`${actionMenu} ${selectors.likeIcon}`);

      cy.realPress('{rightarrow}'); // navigate to 2nd item in action menu
      cy.isFocused(`${actionMenu} ${selectors.moreIcon}`);

      cy.realPress('{enter}'); // open submenu from action menu moreIcon
      cy.isFocused(`${actionMenu} ${selectors.moreActionMenu} li:nth-child(1) a`); // expect focus on the 1st item when menu open
      cy.realPress('{esc}'); // close submenu
      cy.isFocused(`${actionMenu} ${selectors.moreIcon}`);

      cy.realPress('{leftarrow}'); // navigate back to 1st item in action menu
      cy.isFocused(`${actionMenu} ${selectors.likeIcon}`);

      cy.realPress('{esc}'); // navigate back to chat message
      cy.isFocused(chatMessage);
    });
  });

  it('Can cycle focus among action menu and focusable elements inside chat message', () => {
    const chatMessageWithLinks = getChatMessageSelectorAt(1);
    cy.focusOn(chatMessageWithLinks);
    cy.isFocused(chatMessageWithLinks);

    const actionMenu = getActionMenuAt(1);
    cy.get(actionMenu).should('be.visible');

    cy.realPress('{enter}'); // expect focus on 1st item in action menu
    cy.isFocused(`${actionMenu} ${selectors.likeIcon}`);

    cy.realPress('Tab'); // expect focus on 1st link in chat message
    cy.isFocused('#link1');
    cy.realPress('Tab'); // expect focus on 2nd link in chat message
    cy.isFocused('#link2');
    cy.realPress('Tab'); // expect focus on 1st item in action menu
    cy.isFocused(selectors.likeIcon);

    cy.realPress(['Shift', 'Tab']); // expect focus on 2nd link in chat message
    cy.isFocused('#link2');
    cy.realPress(['Shift', 'Tab']); // expect focus on 1st link in chat message
    cy.isFocused('#link1');
    cy.realPress(['Shift', 'Tab']); // expect focus on 1st item in action menu
    cy.isFocused(selectors.likeIcon);
  });
});
