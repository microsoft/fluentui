import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { usePositioning } from '@fluentui/react-positioning';

import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger';
import { PopoverSurface } from './PopoverSurface';

/**
 * Guards the documented `flipBoundary` example in the Engine positioning story.
 *
 * The trigger sits near the bottom of a short scrolling box that is itself near the top of the
 * viewport. There is viewport room below the trigger but not box room, so the requested `below`
 * placement is only overridden when the engine treats the box as its boundary.
 */
const boundaryStyle: React.CSSProperties = {
  position: 'relative',
  height: 220,
  overflow: 'auto',
  border: '1px dashed #888',
  padding: 16,
};

const surfaceStyle: React.CSSProperties = { display: 'block', width: 220, height: 90, background: '#fff' };

const DefaultEngine: React.FC = () => (
  <div style={{ padding: 16 }}>
    <div style={boundaryStyle}>
      <div style={{ height: 150 }} />
      <Popover defaultOpen positioning={{ position: 'below', align: 'start' }}>
        <PopoverTrigger>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverSurface data-testid="surface" style={surfaceStyle}>
          Boundary is the viewport
        </PopoverSurface>
      </Popover>
    </div>
  </div>
);

const InjectedEngine: React.FC = () => {
  const [boundary, setBoundary] = React.useState<HTMLElement | null>(null);

  return (
    <div style={{ padding: 16 }}>
      <div style={boundaryStyle} ref={setBoundary}>
        <div style={{ height: 150 }} />
        <Popover
          defaultOpen
          positioning={{ position: 'below', align: 'start', flipBoundary: boundary, engine: usePositioning }}
        >
          <PopoverTrigger>
            <button data-testid="trigger">Trigger</button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface" style={surfaceStyle}>
            Boundary is the scrolling box
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

describe('flipBoundary — flip detection scoped to an element', () => {
  beforeEach(() => cy.viewport(800, 800));

  it('keeps the surface below the trigger under the default engine', () => {
    // CSS anchor positioning resolves against the viewport, where there is ample room below.
    mount(<DefaultEngine />);

    cy.get('[data-testid="surface"]')
      .should('have.attr', 'data-placement')
      .and('match', /^below/);
  });

  it('flips the surface above the trigger when the box is the flip boundary', () => {
    mount(<InjectedEngine />);

    cy.get('[data-testid="surface"]')
      .should('have.attr', 'data-placement')
      .and('match', /^above/);
  });

  it('keeps the flipped surface inside the boundary box', () => {
    mount(<InjectedEngine />);

    cy.get('[data-testid="trigger"]').then($trigger => {
      const triggerTop = $trigger[0].getBoundingClientRect().top;

      cy.get('[data-testid="surface"]').should($surface => {
        expect($surface[0].getBoundingClientRect().bottom, 'sits above the trigger').to.be.at.most(triggerTop + 1);
      });
    });
  });
});
