import * as React from 'react';
import { useKeyborg } from './hooks/useKeyborg';
import { mount } from '@cypress/react';

describe('Keyborg', () => {
  const Example = () => {
    const keyborg = useKeyborg();
    return <div id="result">{keyborg ? 'pass' : 'fail'}</div>;
  };

  it('should create keyborg instance', () => {
    mount(<Example />);
    cy.contains('pass');
  });

  it('should dispose keyborg instance on unmount', () => {
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
