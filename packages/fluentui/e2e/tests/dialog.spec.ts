import { selectors } from './dialog-example';

describe('Dialog', () => {
  const trigger = `#${selectors.trigger}`;
  const cancelButton = `#${selectors.cancelButton}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, trigger);
    cy.get('body').click('bottomRight');
  });

  it('should open on click trigger', () => {
    cy.clickOn(trigger);
    cy.visible(cancelButton);
  });

  it('should close on click cancel button', () => {
    cy.clickOn(trigger);
    cy.visible(cancelButton);

    cy.clickOn(cancelButton);
    cy.notExist(cancelButton);
  });

  it('should close on click overlay', () => {
    cy.clickOn(trigger);
    cy.visible(cancelButton);

    cy.get('.ui-dialog__overlay').click('topLeft');
    cy.notExist(cancelButton);
  });

  it('should keep open when mouse down on button, and drag mouse outside of Dialog', () => {
    cy.clickOn(trigger);
    cy.visible(cancelButton);

    // press click within Dialog content, drag mouse outside of Dialog content
    cy.get(cancelButton).trigger('mousedown', { eventConstructor: 'MouseEvent', button: 0 }).trigger('mousemove', {
      eventConstructor: 'MouseEvent',
      clientX: 1,
      clientY: 1,
      pageX: 1,
      pageY: 1,
      screenX: 1,
      screenY: 1,
    }); // move mouse to top-left corner
    cy.get('.ui-dialog__overlay').click('topLeft');
    cy.visible(cancelButton);
  });
});
