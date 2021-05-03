// https://github.com/microsoft/fluent-ui-react/issues/1674
describe('Dialog in Dialog', () => {
  const selectors = {
    outerClose: 'outer-close',
    outerHeader: 'outer-header',
    outerTrigger: 'outer-trigger',
    innerClose: 'inner-close',
    innerHeader: 'inner-header',
    innerTrigger: 'inner-trigger',
    overlayPoint: 'overlay-point',
  };

  const outerClose = `#${selectors.outerClose}`;
  const outerHeader = `#${selectors.outerHeader}`;
  const outerTrigger = `#${selectors.outerTrigger}`;
  const innerClose = `#${selectors.innerClose}`;
  const innerHeader = `#${selectors.innerHeader}`;
  const innerTrigger = `#${selectors.innerTrigger}`;
  const overlayPoint = `#${selectors.overlayPoint}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, outerTrigger);
  });

  it('An outer "Dialog" should be open after inner "Dialog" will be opened', () => {
    cy.clickOn(outerTrigger);
    cy.exist(outerHeader);

    cy.clickOn(innerTrigger);
    cy.exist(outerHeader);
    cy.exist(innerHeader);
  });

  it('A click inside inner "Dialog" should not close dialogs', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);
    cy.clickOn(innerHeader);

    cy.exist(outerHeader);
    cy.exist(innerHeader);
  });

  it('A click on overlay should close only the last opened "Dialog"', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);
    cy.exist(innerHeader);

    cy.clickOn(overlayPoint);
    cy.exist(outerHeader);
    cy.notExist(innerHeader);

    cy.clickOn(overlayPoint);
    cy.notExist(outerHeader);
    cy.notExist(innerHeader);
  });

  it('A click on cancel button should close only matching "Dialog"', () => {
    cy.clickOn(outerTrigger);
    cy.clickOn(innerTrigger);

    cy.clickOn(innerClose);
    cy.exist(outerHeader);
    cy.notExist(innerHeader);

    cy.clickOn(outerClose);
    cy.notExist(outerHeader);
    cy.notExist(innerHeader);
  });

  it('A click on content and pressing ESC button should close the last opened dialog', () => {
    cy.clickOn(outerTrigger); // opens dialog
    cy.exist(outerHeader);

    cy.clickOn(innerTrigger); // opens nested dialog
    cy.exist(innerHeader);
    // TODO this test was failling on timeout. Cypress was probably too fast and components weren't ready.
    cy.wait(50);

    cy.clickOn(innerHeader);

    // check that focus moved to body after clicking on Dialog content
    cy.nothingIsFocused();

    // press ESC and check if nested dialog is closed and focus is on nested trigger
    cy.waitForSelectorAndPressKey(innerHeader, '{esc}');
    cy.notExist(innerHeader);
    cy.isFocused(innerTrigger);

    // click on dialog content to move focus to body
    cy.clickOn(outerHeader);
    // TODO this test was failling on timeout. Cypress was probably too fast and components weren't ready.
    cy.wait(50);
    cy.nothingIsFocused();

    // press ESC again and check if the last dialog is closed and focus is on trigger
    cy.waitForSelectorAndPressKey(outerHeader, '{esc}');
    cy.notExist(outerHeader);
    cy.isFocused(outerTrigger);
  });
});
