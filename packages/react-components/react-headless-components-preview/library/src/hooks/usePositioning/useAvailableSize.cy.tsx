import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '../../components/Menu';
import { usePositioning } from './usePositioning';
import { positioningSizeStyles } from './useAvailableSize';

polyfillBodyAndObserve();

const items = Array.from({ length: 40 }, (_, index) => <MenuItem key={index}>Item {index + 1}</MenuItem>);

const AbsoluteSurface = () => {
  const { targetRef, containerRef } = usePositioning({
    strategy: 'absolute',
    autoSize: 'height',
    position: 'below',
    align: 'start',
    pinned: true,
  });
  return (
    <div data-testid="parent" style={{ position: 'relative', height: '500px', width: '300px' }}>
      <button ref={targetRef} style={{ position: 'absolute', top: '40px', height: '20px' }}>
        Trigger
      </button>
      <div
        ref={containerRef}
        data-testid="surface"
        style={{ ...positioningSizeStyles, width: '200px', height: '1000px', overflow: 'auto' }}
      >
        Content
      </div>
    </div>
  );
};

describe('positioning size regressions', () => {
  it('keeps keyboard focus visible inside a CSS-zoomed menu, including on resize', () => {
    cy.viewport(320, 240);
    mount(
      <div style={{ zoom: 2 }}>
        <Menu positioning={{ position: 'below', align: 'center' }}>
          <MenuTrigger>
            <button style={{ position: 'fixed', top: '20px', left: '40px' }}>Trigger</button>
          </MenuTrigger>
          <MenuPopover data-testid="surface">
            <MenuList>{items}</MenuList>
          </MenuPopover>
        </Menu>
      </div>,
    );
    cy.contains('button', 'Trigger').focus().realPress('Enter');
    cy.realPress('End');
    cy.contains('[role="menuitem"]', /^Item 40$/)
      .should('have.focus')
      .should(item => {
        const rect = item[0].getBoundingClientRect();
        expect(rect.top).to.be.at.least(0);
        expect(rect.bottom).to.be.at.most(240);
      });
    cy.viewport(320, 180);
    cy.contains('[role="menuitem"]', /^Item 40$/)
      .should('have.focus')
      .should(item => {
        expect(item[0].getBoundingClientRect().bottom).to.be.at.most(180);
      });
  });

  it('keeps both-axis limits paired with a permitted placement', () => {
    cy.viewport(320, 240);
    mount(
      <>
        <style>{'.review-wide-surface { width: 300px; }'}</style>
        <Menu positioning={{ autoSize: true, position: 'below', align: 'center', fallbackPositions: ['after'] }}>
          <MenuTrigger>
            <button style={{ position: 'fixed', top: '170px', left: '140px', width: '40px', height: '20px' }}>
              Trigger
            </button>
          </MenuTrigger>
          <MenuPopover className="review-wide-surface" data-testid="surface">
            <MenuList>{items}</MenuList>
          </MenuPopover>
        </Menu>
      </>,
    );
    cy.contains('button', 'Trigger').focus().realPress('Enter');
    cy.contains('button', 'Trigger').then(trigger => {
      cy.get('[data-testid=surface]').should(surface => {
        const rect = surface[0].getBoundingClientRect();
        const target = trigger[0].getBoundingClientRect();
        expect(rect.top >= target.bottom || rect.left >= target.right, 'below or after the target').to.be.true;
        expect(rect.top).to.be.at.least(0);
        expect(rect.bottom).to.be.at.most(240);
        expect(rect.right).to.be.at.most(320);
      });
    });
  });

  it('refreshes an absolute surface when only its containing block shrinks', () => {
    cy.viewport(800, 600);
    mount(<AbsoluteSurface />);
    cy.get('[data-testid=surface]').should('have.css', 'max-height', '440px');
    cy.get('[data-testid=parent]').invoke('css', 'height', '300px');
    cy.get('[data-testid=surface]')
      .should('have.css', 'max-height', '240px')
      .should(surface => {
        expect(surface[0].getBoundingClientRect().bottom).to.be.at.most(
          surface[0].parentElement!.getBoundingClientRect().bottom,
        );
      });
  });
});
