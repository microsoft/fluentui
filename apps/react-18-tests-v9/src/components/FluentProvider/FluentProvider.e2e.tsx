import * as React from 'react';
import { mount } from '@cypress/react';
import { Button } from '@fluentui/react-button';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const providerSelector = '.fui-FluentProvider';

describe('FluentProvider in React 18', () => {
  it('applies matching className in strict mode', () => {
    mount(
      <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
          <Button>Click Me</Button>
        </FluentProvider>
      </React.StrictMode>,
    );

    cy.get(providerSelector)
      .invoke('attr', 'class')
      .then($c => {
        const elementClass = $c?.split(' ')[1];
        cy.get(`#${elementClass}`).should('not.be.undefined');
      });

    // ;
  });
});
