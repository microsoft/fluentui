import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Overflow, OverflowItem, useIsOverflowItemVisible, useOverflowMenu } from '@fluentui/react-overflow';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from './';

describe('Menu scrolling during keyboard navigation', () => {
  const ids = Array.from({ length: 20 }, (_, index) => index);
  const Item = ({ index }: { index: number }) => <MenuItem id={`scroll-item-${index}`}>Action {index + 1}</MenuItem>;
  const OverflowMenuItem = ({ index }: { index: number }) =>
    useIsOverflowItemVisible(String(index)) ? null : <Item index={index} />;
  const OverflowMenu = () => {
    const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
    return isOverflowing ? (
      <Menu>
        <MenuTrigger>
          <button ref={ref} id="scroll-trigger">
            More actions
          </button>
        </MenuTrigger>
        <MenuPopover id="scroll-surface" style={{ maxBlockSize: '100%', overflowY: 'auto' }}>
          <MenuList>
            {ids.map(index => (
              <OverflowMenuItem key={index} index={index} />
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    ) : null;
  };
  const OverflowExample = () => (
    <Overflow>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        {ids.map(index => (
          <OverflowItem key={index} id={String(index)}>
            <button style={{ minWidth: '96px' }}>Action {index + 1}</button>
          </OverflowItem>
        ))}
        <OverflowMenu />
      </div>
    </Overflow>
  );
  const Example = () => (
    <Menu>
      <MenuTrigger>
        <button id="scroll-trigger">Actions</button>
      </MenuTrigger>
      <MenuPopover id="scroll-surface" style={{ maxBlockSize: '100%', overflowY: 'auto' }}>
        <MenuList>
          {ids.map(index => (
            <Item key={index} index={index} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );

  const expectVisibleFocus = (index: number) => {
    cy.get(`#scroll-item-${index}`).should('be.focused');
    cy.get('#scroll-surface').should(([surface]) => {
      const item = surface.querySelector<HTMLElement>(`#scroll-item-${index}`)!;
      const top = surface.getBoundingClientRect().top + surface.clientTop;
      const bounds = item.getBoundingClientRect();
      expect(surface.matches(':popover-open')).to.equal(true);
      expect(bounds.top).to.be.at.least(top - 1);
      expect(bounds.bottom).to.be.at.most(top + surface.clientHeight + 1);
      expect(bounds.top).to.be.at.least(0);
      expect(bounds.bottom).to.be.at.most(surface.ownerDocument.defaultView!.innerHeight);
      expect(surface.ownerDocument.scrollingElement!.scrollTop).to.equal(0);
    });
  };

  for (const width of [320, 640]) {
    for (const resizeWhileOpen of [false, true]) {
      it(`reveals focused rows at ${width}px when resized ${resizeWhileOpen ? 'after' : 'before'} opening`, () => {
        cy.viewport(800, 600);
        mount(<Example />);
        if (!resizeWhileOpen) {
          cy.viewport(width, 160);
        }
        cy.get('#scroll-trigger').focus().realPress('Enter');
        cy.get('#scroll-item-0').should('be.focused');
        if (resizeWhileOpen) {
          cy.get('#scroll-item-19').focus();
          cy.viewport(width, 160);
          cy.realPress('ArrowUp');
          expectVisibleFocus(18);
          cy.realPress('ArrowDown');
          expectVisibleFocus(19);
          cy.realPress('ArrowDown');
          expectVisibleFocus(0);
        }

        for (let index = 1; index < 20; index++) {
          cy.realPress('ArrowDown');
          expectVisibleFocus(index);
        }
        cy.get('#scroll-surface').should('have.prop', 'scrollTop').and('be.greaterThan', 0);
        cy.realPress('ArrowDown');
        expectVisibleFocus(0);
        cy.realPress('ArrowUp');
        expectVisibleFocus(19);
        for (let index = 18; index >= 0; index--) {
          cy.realPress('ArrowUp');
          expectVisibleFocus(index);
        }
        cy.realPress('Escape');
        cy.get('#scroll-surface').should('not.be.visible');
        cy.get('#scroll-trigger').should('be.focused');
      });
    }

    it(`reveals retained overflow items after resizing to ${width}px`, () => {
      cy.viewport(800, 600);
      mount(<OverflowExample />);
      cy.get('#scroll-trigger').focus().realPress('Enter');
      cy.get('#scroll-item-19').focus().should('be.focused');
      cy.viewport(width, 160);
      cy.realPress('ArrowUp');
      expectVisibleFocus(18);
      cy.realPress('ArrowDown');
      expectVisibleFocus(19);
      cy.get('#scroll-surface').should('have.prop', 'scrollTop').and('be.greaterThan', 0);
      cy.get('#scroll-surface [role="menuitem"]').then(items => {
        const indexes = Array.from(items, item => Number(item.id.replace('scroll-item-', '')));
        cy.realPress('ArrowDown');
        expectVisibleFocus(indexes[0]);
        for (const index of indexes.slice(1)) {
          cy.realPress('ArrowDown');
          expectVisibleFocus(index);
        }
        for (const index of indexes.slice(0, -1).reverse()) {
          cy.realPress('ArrowUp');
          expectVisibleFocus(index);
        }
      });
      cy.realPress('Escape');
      cy.get('#scroll-surface').should('not.be.visible');
      cy.get('#scroll-trigger').should('be.focused');
    });
  }
});
