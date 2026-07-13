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

// The data attribute the positioning middleware writes when the reference is hidden
const DATA_POSITIONING_HIDDEN = 'data-popper-reference-hidden';

describe('Tooltip', () => {
  describe('overflow behavior (regression: #32882)', () => {
    /**
     * Renders a tooltip trigger inside an overflow:hidden container tall enough
     * to scroll the trigger out of view, then verifies the tooltip content element
     * gets `data-popper-reference-hidden` set once scrolled, and loses it once
     * scrolled back.
     *
     * This is the E2E complement to the unit tests in createPositionManager.test.ts
     * and the CSS fix in useTooltipStyles.styles.ts.
     */
    it('sets data-popper-reference-hidden on the tooltip when the trigger scrolls out of view', () => {
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
            <Tooltip content="Overflow tooltip" relationship="label" data-testid="tooltip-content">
              <Button id="trigger">Hover me</Button>
            </Tooltip>
          </div>
        </div>,
      );

      cy.get('#trigger').realHover();
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('#scroll-container').scrollTo(0, 300);
      cy.get('[role="tooltip"]').should('have.attr', DATA_POSITIONING_HIDDEN);
    });

    it('removes data-popper-reference-hidden when the trigger scrolls back into view', () => {
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
      cy.get('[role="tooltip"]').should('be.visible');

      cy.get('#scroll-container').scrollTo(0, 300);
      cy.get('[role="tooltip"]').should('have.attr', DATA_POSITIONING_HIDDEN);

      cy.get('#scroll-container').scrollTo(0, 0);
      cy.get('[role="tooltip"]').should('not.have.attr', DATA_POSITIONING_HIDDEN);
    });

    it('applies visibility:hidden CSS when data-popper-reference-hidden is present', () => {
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
      cy.get('[role="tooltip"]').should('be.visible');

      cy.get('#scroll-container').scrollTo(0, 300);
      cy.get('[role="tooltip"]').should('have.css', 'visibility', 'hidden');
    });
  });
});
