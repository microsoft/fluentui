import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';

import { useFocusedElementChange } from './useFocusedElementChange';

const Example = (props: { callback: () => void }) => {
  useFocusedElementChange(props.callback);

  return (
    <>
      <a id="anchor" href="#">
        Anchor
      </a>

      <div tabIndex={0}>before</div>
      <button id="button">Button</button>
      <div tabIndex={0}>after</div>
    </>
  );
};

describe('useFocusedElementChange', () => {
  it('should call the callback when the focused element changes', () => {
    const callback = cy.stub().as('callback');
    mount(<Example callback={callback} />);

    cy.get('#anchor').click();
    cy.get('#anchor').should('be.focused');

    cy.get('#button').focus();
    cy.get('#button').should('be.focused');

    cy.get('@callback').should('have.been.calledWith', Cypress.sinon.match.instanceOf(HTMLButtonElement), {
      relatedTarget: Cypress.sinon.match.instanceOf(HTMLAnchorElement),
      isFocusedProgrammatically: false,
    });
  });

  it('should call the callback when the focused element changes programmatically', () => {
    const callback = cy.stub().as('callback');
    mount(<Example callback={callback} />);

    cy.get('#anchor').click();
    cy.get('#anchor').should('be.focused');

    cy.get('#button').invoke('focus');
    cy.get('#button').should('be.focused');

    cy.get('@callback').should('have.been.calledWith', Cypress.sinon.match.instanceOf(HTMLButtonElement), {
      relatedTarget: Cypress.sinon.match.instanceOf(HTMLAnchorElement),
      isFocusedProgrammatically: true,
    });
  });
});
