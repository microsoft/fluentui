import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';

describe('Menu viewport reconciliation', () => {
  it('reveals a portalled submenu invoker after its parent shrinks without moving focus', () => {
    cy.viewport(1000, 700);
    mount(
      <FluentProvider theme={webLightTheme}>
        <Menu>
          <MenuTrigger>
            <button id="viewport-trigger">Actions</button>
          </MenuTrigger>
          <MenuPopover id="viewport-parent" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <MenuList>
              {Array.from({ length: 20 }, (_, index) => (
                <MenuItem key={index}>Action {index + 1}</MenuItem>
              ))}
              <Menu>
                <MenuTrigger>
                  <MenuItem id="viewport-invoker" hasSubmenu>
                    More actions
                  </MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem id="viewport-focused">Nested action</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </MenuList>
          </MenuPopover>
        </Menu>
      </FluentProvider>,
    );
    cy.get('#viewport-trigger').focus().realPress('Enter');
    cy.get('#viewport-invoker').focus().realPress('ArrowRight');
    cy.get('#viewport-focused').should('be.focused');
    cy.get('#viewport-parent').then(([surface]) => {
      surface.style.setProperty('max-height', '80px', 'important');
      surface.scrollTop = 0;
    });
    const check = () =>
      cy.get('#viewport-parent').should(([surface]) => {
        const bounds = surface.getBoundingClientRect();
        const item = surface.ownerDocument.querySelector<HTMLElement>('#viewport-invoker')!;
        const target = item.getBoundingClientRect();
        expect(target.top).to.be.at.least(bounds.top + surface.clientTop - 1);
        expect(target.bottom).to.be.at.most(bounds.top + surface.clientTop + surface.clientHeight + 1);
        expect(surface.scrollTop).to.be.greaterThan(0);
        expect(surface.ownerDocument.activeElement?.id).to.equal('viewport-focused');
      });
    check();
    cy.get('#viewport-parent').then(([surface]) => {
      surface.scrollTop = 0;
    });
    check();
    cy.get('#viewport-focused').realPress('Escape');
    cy.get('#viewport-invoker').should('be.focused');
  });
});
