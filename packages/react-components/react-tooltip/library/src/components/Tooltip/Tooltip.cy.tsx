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

const hoverTrigger = () => {
  cy.get('body').realHover({ position: 'bottomRight' });
  cy.get('#trigger').realHover();
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

      hoverTrigger();

      cy.get('[role="tooltip"]')
        .should('be.visible')
        .then($tooltip => {
          cy.get('#scroll-container').scrollTo(0, 300);
          cy.wrap($tooltip).should('not.be.visible');

          cy.get('#scroll-container').scrollTo(0, 0);
          cy.wrap($tooltip).should('be.visible');
        });
    });

    it('keeps partially clipped triggers visible and hides only after full clipping', () => {
      mount(
        <div id="scroll-container" style={{ height: '100px', overflow: 'auto', position: 'relative' }}>
          <div style={{ height: '400px', paddingTop: '8px' }}>
            <Tooltip content="Partially clipped trigger" relationship="label" visible>
              <Button id="trigger">Trigger</Button>
            </Tooltip>
          </div>
        </div>,
      );

      cy.get('[role="tooltip"]')
        .should('be.visible')
        .then($tooltip => {
          cy.get('#scroll-container').scrollTo(0, 20);
          cy.get('#trigger').should($trigger => {
            const triggerRect = $trigger[0].getBoundingClientRect();
            const containerRect = $trigger[0].closest('#scroll-container')!.getBoundingClientRect();

            expect(triggerRect.top).to.be.lessThan(containerRect.top);
            expect(triggerRect.bottom).to.be.greaterThan(containerRect.top);
          });
          cy.wrap($tooltip).should('be.visible');

          cy.get('#scroll-container').scrollTo(0, 300);
          cy.wrap($tooltip).should('not.be.visible');
          cy.get('#scroll-container').scrollTo(0, 0);
          cy.wrap($tooltip).should('be.visible');
        });
    });
  });

  describe('viewport boundaries', () => {
    [
      { position: 'above' as const, top: 0, left: 300 },
      { position: 'below' as const, bottom: 0, left: 300 },
      { position: 'before' as const, top: 200, left: 0 },
      { position: 'after' as const, top: 200, right: 0 },
    ].forEach(({ position, ...style }) => {
      it(`keeps the tooltip in view at the ${position} viewport edge`, () => {
        cy.viewport(800, 600);
        mount(
          <div style={{ position: 'fixed', ...style }}>
            <Tooltip content="Viewport tooltip" relationship="label" visible positioning={position}>
              <Button id="trigger">Trigger</Button>
            </Tooltip>
          </div>,
        );

        cy.get('[role="tooltip"]')
          .should($tooltip => expect($tooltip).to.have.attr('data-popper-placement'))
          .should('be.visible')
          .should($tooltip => {
            const rect = $tooltip[0].getBoundingClientRect();

            expect(rect.top).to.be.at.least(0);
            expect(rect.left).to.be.at.least(0);
            expect(rect.bottom).to.be.at.most(600);
            expect(rect.right).to.be.at.most(800);
          });
      });
    });

    it('does not hide escaped content for a visible trigger with a pinned large offset', () => {
      const Example = () => {
        const [offset, setOffset] = React.useState(1000);

        return (
          <>
            <Button onClick={() => setOffset(4)}>Reset offset</Button>
            <div style={{ position: 'fixed', top: '200px', left: '300px' }}>
              <Tooltip content="Offset tooltip" relationship="label" visible positioning={{ pinned: true, offset }}>
                <Button id="trigger">Trigger</Button>
              </Tooltip>
            </div>
          </>
        );
      };

      cy.viewport(800, 600);
      mount(<Example />);

      cy.get('#trigger').should('be.visible');
      cy.get('[role="tooltip"]')
        .should($tooltip => {
          expect($tooltip).to.have.attr('data-popper-escaped');
          expect($tooltip).not.to.have.attr('data-popper-reference-hidden');
          expect($tooltip.css('visibility')).to.equal('visible');
          expect($tooltip[0].getBoundingClientRect().bottom).to.be.lessThan(0);
        })
        .then($tooltip => {
          cy.contains('button', 'Reset offset').click();
          cy.wrap($tooltip).should($element => {
            expect($element).not.to.have.attr('data-popper-escaped');
            expect($element).to.be.visible;
          });
        });
    });

    it('does not hide oversized content while its trigger remains visible', () => {
      cy.viewport(800, 600);
      mount(
        <div style={{ position: 'fixed', top: '200px', left: '300px' }}>
          <Tooltip
            content={{ children: 'Oversized tooltip', style: { width: '1000px', height: '800px', maxWidth: 'none' } }}
            relationship="label"
            visible
          >
            <Button id="trigger">Trigger</Button>
          </Tooltip>
        </div>,
      );

      cy.get('#trigger').should('be.visible');
      cy.get('[role="tooltip"]')
        .should($tooltip => expect($tooltip).to.have.attr('data-popper-placement'))
        .should('be.visible')
        .should($tooltip => {
          const rect = $tooltip[0].getBoundingClientRect();

          expect(rect.width).to.be.greaterThan(800);
          expect(rect.height).to.be.greaterThan(600);
        });
    });
  });

  // Verifies the fix for regression reported in https://github.com/microsoft/fluentui/issues/36604
  describe('static non-scrolling overflow:hidden container', () => {
    it('still shows the tooltip when its trigger sits in a tightly-fitted overflow:hidden container', () => {
      mount(
        <div style={{ overflow: 'hidden', display: 'flex' }}>
          <Tooltip content="I should still appear" relationship="label">
            <Button id="trigger">Hover me</Button>
          </Tooltip>
        </div>,
      );

      hoverTrigger();

      cy.get('[role="tooltip"]').should('be.visible').and('have.text', 'I should still appear');
    });

    it('still hides the tooltip when the trigger itself is clipped', () => {
      mount(
        <div style={{ height: '40px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '100px' }}>
            <Tooltip content="Clipped trigger" relationship="label" visible>
              <Button id="trigger">Hover me</Button>
            </Tooltip>
          </div>
        </div>,
      );

      cy.get('[role="tooltip"]').should('not.be.visible');
    });

    it('respects overflow clipping through a fixed-position containing block', () => {
      mount(
        <div style={{ height: '40px', overflow: 'hidden', position: 'relative', transform: 'translateZ(0)' }}>
          <div style={{ position: 'fixed', top: '100px' }}>
            <Tooltip content="Fixed clipped trigger" relationship="label" visible>
              <Button id="trigger">Hover me</Button>
            </Tooltip>
          </div>
        </div>,
      );

      cy.get('[role="tooltip"]').should('not.be.visible');
    });

    it('does not clip a fixed-position trigger through a non-containing scroll ancestor', () => {
      mount(
        <div style={{ height: '40px', overflow: 'auto' }}>
          <div style={{ height: '300px' }}>
            <div style={{ position: 'fixed', top: '100px' }}>
              <Tooltip content="Fixed visible trigger" relationship="label" visible>
                <Button id="trigger">Hover me</Button>
              </Tooltip>
            </div>
          </div>
        </div>,
      );

      cy.get('[role="tooltip"]').should('be.visible');
    });

    it('re-evaluates clipping ancestors after overflow styles change', () => {
      mount(
        <div id="dynamic-overflow-container">
          <div style={{ height: '300px' }}>
            <Tooltip content="Dynamic overflow" relationship="label" visible>
              <Button id="trigger">Hover me</Button>
            </Tooltip>
          </div>
        </div>,
      );

      cy.get('[role="tooltip"]')
        .should('be.visible')
        .then($tooltip => {
          cy.get('#dynamic-overflow-container').invoke('attr', 'style', 'height: 40px; overflow: auto');
          cy.get('#dynamic-overflow-container').scrollTo(0, 200);
          cy.window().trigger('resize');
          cy.wrap($tooltip).should('not.be.visible');

          cy.get('#dynamic-overflow-container').scrollTo(0, 0);
          cy.get('#dynamic-overflow-container').invoke('attr', 'style', 'overflow: visible');
          cy.window().trigger('resize');
          cy.wrap($tooltip).should('be.visible');
        });
    });
  });

  describe('nested scrollable ancestors', () => {
    it('hides the tooltip when the outer scroll parent clips its trigger', () => {
      mount(
        <div
          id="outer-scroll-container"
          style={{
            height: '100px',
            width: '200px',
            overflow: 'hidden scroll',
            position: 'relative',
          }}
        >
          <div style={{ height: '400px', paddingTop: '8px' }}>
            <div id="inner-scroll-container" style={{ height: '200px', overflow: 'hidden scroll' }}>
              <div style={{ height: '400px' }}>
                <div style={{ overflow: 'hidden', display: 'flex' }}>
                  <Tooltip content="Nested tooltip" relationship="label">
                    <Button id="trigger">Hover me</Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );

      hoverTrigger();

      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('#outer-scroll-container').scrollTo(0, 300);
      cy.get('[role="tooltip"]').should('not.be.visible');
      cy.get('#outer-scroll-container').scrollTo(0, 0);
      cy.get('[role="tooltip"]').should('be.visible');
    });

    it('hides when an inner scroll moves the trigger outside an outer clipping ancestor', () => {
      mount(
        <div id="outer-clip-container" style={{ height: '100px', width: '200px', overflow: 'hidden' }}>
          <div
            id="inner-scroll-container"
            style={{ height: '200px', overflow: 'auto', position: 'relative', top: '-50px' }}
          >
            <div style={{ height: '400px', paddingTop: '100px' }}>
              <Tooltip content="Outer clipped tooltip" relationship="label" visible>
                <Button id="trigger">Hover me</Button>
              </Tooltip>
            </div>
          </div>
        </div>,
      );

      cy.get('[role="tooltip"]')
        .should('be.visible')
        .then($tooltip => {
          cy.get('#inner-scroll-container').scrollTo(0, 99);
          cy.get('#outer-clip-container').then($outer => {
            cy.get('#inner-scroll-container').then($inner => {
              cy.get('#trigger').then($trigger => {
                const triggerRect = $trigger[0].getBoundingClientRect();
                const innerRect = $inner[0].getBoundingClientRect();
                const outerRect = $outer[0].getBoundingClientRect();

                expect(triggerRect.top).to.be.at.least(innerRect.top);
                expect(triggerRect.bottom).to.be.at.most(innerRect.bottom);
                expect(triggerRect.bottom).to.be.at.most(outerRect.top);
              });
            });
          });
          cy.wrap($tooltip).should('not.be.visible');

          cy.get('#inner-scroll-container').scrollTo(0, 0);
          cy.wrap($tooltip).should('be.visible');
        });
    });
  });
});
