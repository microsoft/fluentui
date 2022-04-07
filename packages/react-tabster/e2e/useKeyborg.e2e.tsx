import * as React from 'react';
import { KEYBOARD_NAV_ATTRIBUTE } from '../src/symbols';
import { useKeyboardNavAttribute } from '@fluentui/react-tabster';
import { mount as mountBase } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Keyborg', () => {
  const Example = () => (
    <div ref={useKeyboardNavAttribute()}>
      <button>Start</button>
      <button>Finish</button>
    </div>
  );

  it('should open when clicked', () => {
    mount(<Example />);
    cy.contains('Start').focus().realPress('Tab');
    cy.contains('Finish').should('be.focused').parent().should('have.attr', KEYBOARD_NAV_ATTRIBUTE);
  });
});
