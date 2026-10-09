import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { PositioningProvider } from '../../positioning-floating-ui';
import type { PositioningMode } from '../../positioning-floating-ui';
import type { PositioningShorthand } from '../../positioning';

const mount = (element: JSXElement) => {
  mountBase(element);
};

const surfaceSelector = '[data-popover-surface]';

const PositionedPopover = (props: { positioning: PositioningShorthand; withArrow?: boolean; tall?: boolean }) => (
  <div style={{ padding: 200 }}>
    <Popover defaultOpen withArrow={props.withArrow} positioning={props.positioning}>
      <PopoverTrigger disableButtonEnhancement>
        <button>Trigger</button>
      </PopoverTrigger>
      <PopoverSurface>{props.tall ? <div style={{ height: 5000 }}>Tall content</div> : 'Surface'}</PopoverSurface>
    </Popover>
  </div>
);

const mountWithMode = (mode: PositioningMode, props: React.ComponentProps<typeof PositionedPopover>) =>
  mount(
    <PositioningProvider mode={mode}>
      <PositionedPopover {...props} />
    </PositioningProvider>,
  );

/** `position-area` is missing in the React 17 run's Electron 118, where every fallback surface takes the engine. */
const supportsPositionArea = (win: Window & typeof globalThis) =>
  Boolean(win.CSS?.supports?.('position-area', 'bottom'));

const expectCssAnchorPositioning = () =>
  cy.get(surfaceSelector).should($el => {
    expect($el).to.have.length(1);
    expect($el[0]).not.to.have.attr('data-popper-placement');
    expect($el[0].style.getPropertyValue('position-anchor')).to.match(/^--popover-anchor-/);
  });

describe('Popover positioning', () => {
  it('positions with CSS anchor positioning by default', () => {
    mount(
      <Popover defaultOpen positioning="below-start">
        <PopoverTrigger disableButtonEnhancement>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface>Surface</PopoverSurface>
      </Popover>,
    );

    cy.get(surfaceSelector).should($el => {
      expect($el[0]).not.to.have.attr('data-popper-placement');
      expect($el[0].style.transform).to.equal('');
    });

    cy.window().then(win => {
      if (supportsPositionArea(win)) {
        cy.get(surfaceSelector).should('have.attr', 'data-placement', 'below-start');
        expectCssAnchorPositioning();
      }
    });
  });

  describe('PositioningProvider mode="floating-ui"', () => {
    it('positions every surface with Floating UI', () => {
      mountWithMode('floating-ui', { positioning: { position: 'below', align: 'start' } });

      cy.get(surfaceSelector)
        .should('have.attr', 'data-popper-placement', 'bottom-start')
        .and('have.attr', 'data-placement', 'below-start')
        .and($el => {
          expect($el[0].style.getPropertyValue('position-anchor')).to.equal('');
          expect($el[0].style.transform).to.match(/translate/);
          expect($el[0].style.position).to.equal('fixed');
        });

      cy.get('button').then($trigger => {
        const trigger = $trigger[0].getBoundingClientRect();
        cy.get(surfaceSelector).then($surface => {
          const surface = $surface[0].getBoundingClientRect();
          expect(Math.round(surface.left)).to.equal(Math.round(trigger.left));
          expect(surface.top).to.be.closeTo(trigger.bottom, 1);
        });
      });
    });

    it('applies engine-only options such as autoSize', () => {
      mountWithMode('floating-ui', { positioning: { position: 'below', autoSize: true }, tall: true });

      cy.get(surfaceSelector).should($el => {
        expect($el[0].style.maxHeight).to.match(/px$/);
        expect($el[0].getBoundingClientRect().bottom).to.be.at.most(window.innerHeight + 1);
      });
    });

    it('positions the arrow', () => {
      mountWithMode('floating-ui', { positioning: 'after', withArrow: true });

      cy.get(surfaceSelector).should('have.attr', 'data-popper-placement', 'right');
      cy.get('[data-arrow]').should($arrow => {
        expect($arrow[0].style.top).to.match(/px$/);
      });
    });
  });

  describe('PositioningProvider mode="fallback"', () => {
    it('keeps CSS anchor positioning for a surface that does not need Floating UI', () => {
      mountWithMode('fallback', { positioning: { position: 'below' } });

      cy.window().then(win => {
        if (supportsPositionArea(win)) {
          expectCssAnchorPositioning();
        } else {
          cy.get(surfaceSelector).should('have.attr', 'data-popper-placement', 'bottom');
        }
      });
    });

    it('hands over to Floating UI for a surface with engine-only options', () => {
      mountWithMode('fallback', { positioning: { position: 'below', autoSize: true } });

      cy.get(surfaceSelector)
        .should('have.attr', 'data-popper-placement', 'bottom')
        .and($el => {
          expect($el[0].style.getPropertyValue('position-anchor')).to.equal('');
        });
    });
  });

  describe('PositioningProvider mode="css"', () => {
    it('opts a subtree back to CSS anchor positioning inside another provider', () => {
      mount(
        <PositioningProvider mode="floating-ui">
          <PositioningProvider mode="css">
            <PositionedPopover positioning={{ position: 'below' }} />
          </PositioningProvider>
        </PositioningProvider>,
      );

      cy.get(surfaceSelector).should('not.have.attr', 'data-popper-placement');
      cy.window().then(win => {
        if (supportsPositionArea(win)) {
          expectCssAnchorPositioning();
        }
      });
    });
  });
});
