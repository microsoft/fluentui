import { selectors } from './popupIframeDismiss-example';

describe('Popup - Dismiss on iframe click', () => {
  const popupTrigger = `#${selectors.popupTriggerId}`;
  const popupContent = `.${selectors.popupContentClass}`;
  const iframe = `.${selectors.iframe}`;

  beforeEach(() => {
    cy.gotoTestCase(__filename, popupTrigger);
  });

  it('is should close popup on iframe click', () => {
    cy.clickOn(popupTrigger);
    cy.visible(popupContent);

    cy.clickOn(iframe);
    cy.isFocused(iframe);

    cy.wait(1500);

    cy.get(popupContent).should('not.exist');
  });
});
