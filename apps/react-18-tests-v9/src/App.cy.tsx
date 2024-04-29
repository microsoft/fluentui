import * as React from 'react';
import { mount } from '@cypress/react';

import { App } from './App';

const providerSelector = '.fui-FluentProvider';

describe('App with React 18', () => {
  describe('FluentProvider', () => {
    it('should apply matching className in strict mode', () => {
      mount(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );

      cy.get(providerSelector)
        .invoke('attr', 'class')
        .then($c => {
          const elementClass = $c?.split(' ')[1];
          cy.get(`#${elementClass}`).should('not.be.undefined');
        });
    });
  });
});
