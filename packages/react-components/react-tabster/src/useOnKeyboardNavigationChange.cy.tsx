import * as React from 'react';
import { mount } from '@cypress/react';
import { useOnKeyboardNavigationChange } from './hooks';

describe('useOnKeyboardNavigationChange', () => {
  it('Should invoke callback when navigation mode changes', () => {
    const Example = () => {
      const [isKeyboard, setIsKeyboard] = React.useState(false);
      useOnKeyboardNavigationChange(isNavigatingWithKeyboard => setIsKeyboard(isNavigatingWithKeyboard));

      return (
        <>
          <button id="button">button</button>
          <span id="result">Navigation mode: {isKeyboard ? 'keyboard' : 'mouse'}</span>
        </>
      );
    };

    mount(<Example />);
    cy.get('#button')
      .click()
      .get('#result')
      .should('contain.text', 'mouse')
      .get('#button')
      .type('{enter}')
      .get('#result')
      .should('contain.text', 'keyboard')
      .get('#button')
      .click()
      .get('#result')
      .should('contain.text', 'mouse');
  });

  it('Should dipose keyborg on hook unmount', () => {
    const Example = () => {
      const [isKeyboard, setIsKeyboard] = React.useState(false);
      useOnKeyboardNavigationChange(isNavigatingWithKeyboard => setIsKeyboard(isNavigatingWithKeyboard));

      return (
        <>
          <button id="button">button</button>
          <span id="result">Navigation mode: {isKeyboard ? 'keyboard' : 'mouse'}</span>
        </>
      );
    };

    mount(<Example />);
    cy.window().then(win => {
      // @ts-expect-error - Only way to definitively check if keyborg is disposed
      expect(win.__keyborg).not.equals(undefined);
    });
    mount(<div>Unmounted</div>);
    cy.window().then(win => {
      // @ts-expect-error - Only way to definitively check if keyborg is disposed
      expect(win.__keyborg).equals(undefined);
    });
  });
});
