import * as React from 'react';
import { useFocusedElementChange } from './useFocusedElementChange';
import { mount } from '@cypress/react';

const Example = (props: { callback: () => void }) => {
  useFocusedElementChange(props.callback);
  return (
    <>
      <div tabIndex={0}>before</div>
      <button id="btn-1">Button 1</button>
      <div tabIndex={0}>after</div>
    </>
  );
};

describe('useFocusedElementChange', () => {
  it('should call the callback when the focused element changes', () => {
    const callback = cy.stub().as('callback');
    mount(<Example callback={callback} />);

    cy.get('#btn-1').focus();
    cy.get('@callback').should('have.been.calledOnceWith', Cypress.sinon.match.instanceOf(HTMLButtonElement), {
      relatedTarget: Cypress.sinon.match.any,
      isFocusedProgrammatically: false,
    });
  });
  it('should call the callback when the focused element changes programmatically', () => {
    const callback = cy.stub().as('callback');
    mount(<Example callback={callback} />);

    cy.get('#btn-1').invoke('focus');
    cy.get('@callback').should('have.been.calledOnceWith', Cypress.sinon.match.instanceOf(HTMLButtonElement), {
      relatedTarget: Cypress.sinon.match.any,
      isFocusedProgrammatically: true,
    });
  });
});
