import 'cypress-real-events';
import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { Button } from '@fluentui/react-button';
import { Tooltip } from './index';

const mount = (element: React.ReactElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Tooltip', () => {
  describe('overflow behavior (regression: #32882)', () => {
    it('hides and restores the tooltip when its trigger scrolls out of view', () => {
      mount(
        <div
          id="scroll-container"
          style={{
            height: '100px',
            width: '200px',
            overflow: 'hidden scroll',
            position: 'relative',
          }}
        >
          <div style={{ height: '400px', paddingTop: '8px' }}>
            <Tooltip content="Overflow tooltip" relationship="label">
              <Button id="trigger">Hover me</Button>
            </Tooltip>
          </div>
        </div>,
      );

      cy.get('#trigger').realHover();
      cy.get('[role="tooltip"]').as('tooltip').should('be.visible');

      cy.get('#scroll-container').scrollTo(0, 300);
      cy.get('@tooltip')
        .should('exist')
        .and('have.css', 'visibility', 'hidden')
        .and('have.css', 'pointer-events', 'none');

      cy.get('#scroll-container').scrollTo(0, 0);
      cy.get('@tooltip').should('be.visible');
    });
  });
});
