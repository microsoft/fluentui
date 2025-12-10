import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import { MenuGrid, MenuGridItem, MenuGridCell, MenuGridRow } from '@fluentui/react-menu-grid-preview';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const menuSelector = '[role="menu"]';
const menuGridItemSelector = '[role="row"]';

const items = ['Olivia Carter', 'Liam Thompson', 'Sophia Martinez', 'Noah Patel', 'Emma Robinson'];

const DefaultExample = () => {
  return (
    <MenuGrid>
      {items.map((name, index) => (
        <MenuGridItem
          key={name}
          id={`row${index}`}
          firstSubAction={<button>Profile for {name}</button>}
          secondSubAction={<button>Remove {name}</button>}
        >
          {name}
        </MenuGridItem>
      ))}
    </MenuGrid>
  );
};

describe('MenuGrid', () => {
  it('should be able to tab in/out of the MenuGrid', () => {
    mount(
      <>
        <button className="first">Foo</button>
        <DefaultExample />
        <button className="last">Bar</button>
      </>,
    );

    cy.get('button.first').first().focus().realPress('Tab');
    cy.get(menuGridItemSelector).first().should('be.focused').realPress('Tab');
    cy.get('button.last').first().should('be.focused');
  });

  it('should be able to navigate the MenuGrid', () => {
    mount(<DefaultExample />);
    cy.get('body')
      .click()
      .get(menuGridItemSelector)
      .first()
      .focus()
      .focused()
      .should('have.id', 'row0')
      .realPress('ArrowDown')
      .focused()
      .should('have.id', 'row1')
      .realPress('ArrowDown')
      .focused()
      .should('have.id', 'row2')
      .realPress('ArrowRight')
      .focused()
      .should('have.text', 'Profile for Sophia Martinez')
      .realPress('ArrowRight')
      .focused()
      .should('have.text', 'Remove Sophia Martinez');
  });
});

const Submenu = () => {
  return (
    <Menu>
      <MenuTrigger>
        <button
          onKeyDown={event => {
            if (event.key === 'ArrowDown') {
              // Prevent arrow down from opening the menu to enable navigation in grid instead
              event.preventDefault();
            }
          }}
        >
          More actions
        </button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Show profile</MenuItem>
          <MenuItem>Audio call</MenuItem>
          <MenuItem>Video call</MenuItem>
          <MenuItem>Remove</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const WithSubmenuExample = () => {
  return (
    <MenuGrid>
      {items.map(name => (
        <MenuGridItem key={name} firstSubAction={<Submenu />}>
          {name}
        </MenuGridItem>
      ))}
    </MenuGrid>
  );
};

const MoreComplexExample = () => {
  return (
    <MenuGrid>
      {items.map((name, index) => (
        <MenuGridRow key={name} id={`row${index}`}>
          <MenuGridCell>
            <button>Profile for {name}</button>
          </MenuGridCell>
          <MenuGridCell>{name}</MenuGridCell>
          <MenuGridCell>
            <button>Audio call</button>
          </MenuGridCell>
          <MenuGridCell>
            <button>Video call</button>
          </MenuGridCell>
          <MenuGridCell>
            <button>Remove {name}</button>
          </MenuGridCell>
        </MenuGridRow>
      ))}
    </MenuGrid>
  );
};

describe('More complex menus', () => {
  it('should be able to navigate the MenuGrid', () => {
    mount(<MoreComplexExample />);
    cy.get('body')
      .click()
      .get(menuGridItemSelector)
      .first()
      .focus()
      .focused()
      .should('have.id', 'row0')
      .realPress('ArrowDown')
      .focused()
      .should('have.id', 'row1')
      .realPress('ArrowDown')
      .focused()
      .should('have.id', 'row2')
      .realPress('ArrowRight')
      .focused()
      .should('have.text', 'Profile for Sophia Martinez')
      .realPress('ArrowRight')
      .focused()
      .should('have.text', 'Audio call')
      .realPress('ArrowRight')
      .focused()
      .should('have.text', 'Video call')
      .realPress('ArrowRight')
      .focused()
      .should('have.text', 'Remove Sophia Martinez');
  });
});

describe('With MenuList submenus', () => {
  it('should not open a submenu trigger with ArrowDown', () => {
    mount(<WithSubmenuExample />);
    cy.get(menuGridItemSelector).first().focus().realPress('ArrowRight').realPress('ArrowDown');
    cy.get(menuSelector).should('have.length', 0);
    cy.focused().should('have.attr', 'role', 'row');
  });

  it('should focus next grid row from a submenu trigger with ArrowDown', () => {
    mount(<WithSubmenuExample />);
    cy.get(menuGridItemSelector).first().focus().realPress('ArrowRight').realPress('ArrowDown');
    cy.get(menuGridItemSelector).eq(1).should('be.focused');
  });

  it('should open a submenu trigger with Enter', () => {
    mount(<WithSubmenuExample />);
    cy.get(menuGridItemSelector).first().focus().realPress('ArrowRight').realPress('Enter');
    cy.get(menuSelector).should('have.length', 1);
    cy.focused().should('have.attr', 'role', 'menuitem');
  });
});
