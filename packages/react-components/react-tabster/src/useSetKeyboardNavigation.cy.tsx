import * as React from 'react';
import { mount } from '@cypress/react';
import { useSetKeyboardNavigation, useOnKeyboardNavigationChange } from './hooks';

describe('useSetKeyboardNavigation', () => {
  it('Should invoke callback when navigation mode changes', () => {
    const Example = () => {
      const [isKeyboard, setIsKeyboard] = React.useState(false);
      useOnKeyboardNavigationChange(isNavigatingWithKeyboard => setIsKeyboard(isNavigatingWithKeyboard));
      const setKeyboardNavigation = useSetKeyboardNavigation();

      return (
        <>
          {/** By default keyborg does not register any keydown events in input as keyboard navigation */}
          <input type="text" id="input" onKeyDown={() => setKeyboardNavigation(true)} />
          <span id="result">Navigation mode: {isKeyboard ? 'keyboard' : 'mouse'}</span>
        </>
      );
    };

    mount(<Example />);
    cy.get('#input')
      .focus()
      .get('#result')
      .should('contain.text', 'mouse')
      .get('#input')
      .type('{upArrow}')
      .get('#result')
      .should('contain.text', 'keyboard');
  });
});
