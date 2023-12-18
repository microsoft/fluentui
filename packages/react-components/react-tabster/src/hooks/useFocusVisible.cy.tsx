import * as React from 'react';
import { mount } from '@cypress/react';
import root from 'react-shadow';
import { useFocusVisible } from './useFocusVisible';
import { FOCUS_VISIBLE_ATTR } from '../focus/constants';

describe('useFocusObserved', () => {
  it('should apply focus visible attribute elements in an open shadow root', () => {
    const Example = () => {
      const ref = useFocusVisible<HTMLDivElement>();
      return (
        <div ref={ref}>
          <button id="start">Start</button>
          <root.div id="shadow-host">
            <button id="end">End</button>
          </root.div>
        </div>
      );
    };

    mount(<Example />);
    cy.get('#start').focus().realPress('Tab').pause();
    cy.get('#shadow-host').shadow().find('#end').should('have.attr', FOCUS_VISIBLE_ATTR);
  });

  it('should remove focus visible attribute when focus leaves shadow root', () => {
    const Example = () => {
      const ref = useFocusVisible<HTMLDivElement>();
      return (
        <div ref={ref}>
          <button id="start">Start</button>
          <root.div id="shadow-host">
            <button id="end">End</button>
          </root.div>
        </div>
      );
    };

    mount(<Example />);
    cy.get('#start').focus().realPress('Tab').realPress(['Shift', 'Tab']);
    cy.get('#start')
      .should('have.focus')
      .get('#shadow-host')
      .shadow()
      .find('#end')
      .should('not.have.attr', FOCUS_VISIBLE_ATTR);
  });
});
