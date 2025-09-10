import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Button } from '@fluentui/react-components';

import { Provider } from './Provider';

const providerSelector = '.fui-FluentProvider';

describe('Provider with React 18', () => {
  describe('FluentProvider', () => {
    it('should apply matching className in strict mode', () => {
      mount(
        <Provider>
          <Button>Click Me</Button>
        </Provider>,
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
