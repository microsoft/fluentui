import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
import type { JSXElement } from '@fluentui/react-utilities';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger/PopoverTrigger';
import { PopoverSurface } from './PopoverSurface/PopoverSurface';
import { PositioningEngineProvider } from '../../positioning';

const mount = (element: JSXElement) => {
  mountBase(element);
};

const surfaceSelector = '[data-popover-surface]';

describe('Popover positioning engine', () => {
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

    // `position-anchor` and the resolved placement only exist when the browser supports CSS anchor
    // positioning (Chromium 125+). The React 17 integration run uses Cypress 13 / Electron 118, which
    // drops the unknown property and leaves the surface at the UA's centred top-layer position.
    cy.window().then(win => {
      if (win.CSS?.supports?.('anchor-name: --x')) {
        cy.get(surfaceSelector)
          .should('have.attr', 'data-placement', 'below-start')
          .and($el => {
            expect($el[0].style.getPropertyValue('position-anchor')).to.match(/^--popover-anchor-/);
          });
      }
    });
  });

  it('delegates to an inline engine, which replaces CSS anchor positioning', () => {
    mount(
      <div style={{ padding: 200 }}>
        <Popover defaultOpen positioning={{ position: 'below', align: 'start', engine: floatingUIPositioningEngine }}>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>Surface</PopoverSurface>
        </Popover>
      </div>,
    );

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
    mount(
      <div style={{ padding: 200 }}>
        <Popover defaultOpen positioning={{ position: 'below', autoSize: true, engine: floatingUIPositioningEngine }}>
          <PopoverTrigger disableButtonEnhancement>
            <button>Trigger</button>
          </PopoverTrigger>
          <PopoverSurface>
            <div style={{ height: 5000 }}>Tall content</div>
          </PopoverSurface>
        </Popover>
      </div>,
    );

    cy.get(surfaceSelector).should($el => {
      expect($el[0].style.maxHeight).to.match(/px$/);
      expect($el[0].getBoundingClientRect().bottom).to.be.at.most(window.innerHeight + 1);
    });
  });

  it('falls back to the engine supplied by PositioningEngineProvider and positions the arrow', () => {
    mount(
      <PositioningEngineProvider value={floatingUIPositioningEngine}>
        <div style={{ padding: 200 }}>
          <Popover defaultOpen withArrow positioning="after">
            <PopoverTrigger disableButtonEnhancement>
              <button>Trigger</button>
            </PopoverTrigger>
            <PopoverSurface>Surface</PopoverSurface>
          </Popover>
        </div>
      </PositioningEngineProvider>,
    );

    cy.get(surfaceSelector).should('have.attr', 'data-popper-placement', 'right');
    cy.get('[data-arrow]').should($arrow => {
      expect($arrow[0].style.top).to.match(/px$/);
    });
  });
});
