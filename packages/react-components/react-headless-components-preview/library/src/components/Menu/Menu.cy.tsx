import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Menu, MenuPopover, MenuList, MenuItem, MenuTrigger } from './';
import { Tooltip } from '../Tooltip';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => mountBase(element);

describe('Menu', () => {
  describe('with Tooltip wrapping MenuTrigger', () => {
    const TooltipWrappedMenuExample = () => (
      <Menu>
        <Tooltip hideDelay={0} showDelay={0} content="Click to open menu options" relationship="label">
          <MenuTrigger>
            <button id="tooltip-wrapped-trigger">Options</button>
          </MenuTrigger>
        </Tooltip>
        <MenuPopover>
          <MenuList>
            <MenuItem id="menu-item-1">New</MenuItem>
            <MenuItem id="menu-item-2">Open</MenuItem>
            <MenuItem id="menu-item-3">Save</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );

    it('should open menu when tooltip-wrapped trigger is clicked', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('exist');
      cy.get('#menu-item-1').should('not.be.visible');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-3').should('be.visible');
    });

    it('should have tooltip accessible on the trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-label', 'Click to open menu options');
    });

    it('should have proper ARIA haspopup and expanded attributes', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-haspopup', 'menu');
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#tooltip-wrapped-trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should handle keyboard interaction (Enter) with tooltip-wrapped trigger', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').focus().realPress('Enter');
      cy.get('#menu-item-1').should('be.visible');
    });

    it('should allow menu item selection and close menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-2').should('be.visible');
      cy.get('#menu-item-2').click();
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should dismiss on Escape even with tooltip wrapper', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').click();
      cy.get('#menu-item-1').should('be.visible');
      cy.focused().realPress('Escape');
      cy.get('#menu-item-1').should('not.be.visible');
    });

    it('should show tooltip on hover without opening menu', () => {
      mount(<TooltipWrappedMenuExample />);
      cy.get('#tooltip-wrapped-trigger').trigger('pointerover');
      cy.get('[role="tooltip"]').should('be.visible');
      cy.get('[role="tooltip"]').should('contain.text', 'Click to open menu options');
      cy.get('#menu-item-1').should('not.be.visible');
    });
  });
});
