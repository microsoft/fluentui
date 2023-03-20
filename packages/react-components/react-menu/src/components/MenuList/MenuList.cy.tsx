import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { menuItemSelector, menuSelector } from '../../testing/selectors';

import { MenuList, MenuItem, Menu, MenuTrigger, MenuPopover } from '@fluentui/react-menu';
const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};
describe('MenuList', () => {
  it('should focus each menu item on hover', () => {
    mount(
      <div style={{ width: 'max-content', border: '1px solid black', paddingTop: 4, paddingBottom: 4 }}>
        <MenuList>
          <MenuItem>Cut</MenuItem>
          <MenuItem>Paste</MenuItem>
          <MenuItem>Edit</MenuItem>
        </MenuList>
      </div>,
    );
    cy.get(menuItemSelector).each(el => {
      cy.wrap(el).trigger('mouseover').should('be.focused');
    });
  });

  describe('With nested submenus', () => {
    const Example = () => {
      return (
        <div style={{ width: 'max-content', border: '1px solid black', paddingTop: 4, paddingBottom: 4 }}>
          <MenuList>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Paste</MenuItem>
            <MenuItem>Edit</MenuItem>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuItem>Preferences</MenuItem>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Cut</MenuItem>
                  <MenuItem>Paste</MenuItem>
                  <MenuItem>Edit</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </div>
      );
    };

    it('should not open a menu trigger with ArrowDown', () => {
      mount(<Example />);
      cy.get(menuItemSelector).eq(3).focus().type('{downarrow}').get(menuSelector).should('have.length', 1);
    });

    it('should focus next menuitem from a menu trigger with ArrowDown', () => {
      mount(<Example />);
      cy.get('body').click().get(menuItemSelector).eq(3).focus().type('{downarrow}');

      cy.focused().get(menuItemSelector).first().should('be.focused');
    });

    it('should open a menu trigger with ArrowRight', () => {
      mount(<Example />);
      cy.get(menuItemSelector).eq(3).focus().type('{rightarrow}').get(menuSelector).should('have.length', 2);
    });

    it('should be able to tab in/out of the MenuList', () => {
      mount(
        <>
          <button>Foo</button>
          <Example />
          <button>Foo</button>
        </>,
      );

      cy.get('button').first().focus().realPress('Tab');
      cy.get(menuItemSelector).first().should('be.focused').realPress('Tab');
      cy.get('button').eq(1).should('be.focused');
    });
  });
});
