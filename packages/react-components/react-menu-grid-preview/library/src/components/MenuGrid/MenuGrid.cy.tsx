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

const gridSelector = '[role="grid"]';
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

  it('should wrap focus to the first row when pressing ArrowDown on the last row', () => {
    mount(<DefaultExample />);
    cy.get('body')
      .click()
      .get(menuGridItemSelector)
      .last()
      .focus()
      .should('have.id', `row${items.length - 1}`)
      .realPress('ArrowDown');
    cy.focused().should('have.id', 'row0');
  });

  it('should wrap focus to the last row when pressing ArrowUp on the first row', () => {
    mount(<DefaultExample />);
    cy.get('body').click().get(menuGridItemSelector).first().focus().should('have.id', 'row0').realPress('ArrowUp');
    cy.focused().should('have.id', `row${items.length - 1}`);
  });

  const NonCircularExample = () => {
    return (
      <MenuGrid circular={false}>
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

  describe('Non-circular navigation', () => {
    it('should not wrap focus when circular is false and ArrowDown is pressed on the last row', () => {
      mount(<NonCircularExample />);
      cy.get(menuGridItemSelector)
        .last()
        .focus()
        .should('have.id', `row${items.length - 1}`);
      cy.focused().realPress('ArrowDown');
      cy.focused().should('have.id', `row${items.length - 1}`);
    });
  });

  it('should not wrap focus when circular is false and ArrowUp is pressed on the first row', () => {
    mount(<NonCircularExample />);
    cy.get(menuGridItemSelector).first().focus().should('have.id', 'row0');
    cy.focused().realPress('ArrowUp');
    cy.focused().should('have.id', 'row0');
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

const WithSubmenuInsideMenuExample = () => {
  return (
    <Menu open>
      <MenuTrigger disableButtonEnhancement>
        <button>Open</button>
      </MenuTrigger>
      <MenuPopover>
        <MenuGrid>
          {items.map(name => (
            <MenuGridItem key={name} firstSubAction={<Submenu />}>
              {name}
            </MenuGridItem>
          ))}
        </MenuGrid>
      </MenuPopover>
    </Menu>
  );
};

describe('With MenuList submenus inside outer Menu', () => {
  it('should open submenu on trigger hover', () => {
    mount(<WithSubmenuInsideMenuExample />);
    // trigger('mousemove') instead of realHover: the trigger button is inside a portal and may
    // not be reachable by real CDP mouse events in the headless test viewport. A synthetic
    // mousemove fires useMenuTrigger.onMouseMove, which schedules open after hoverDelay (500ms).
    cy.get('button').contains('More actions').first().trigger('mousemove');
    cy.get(menuSelector).should('have.length', 1);
  });

  it('should keep submenu open when mouse moves from trigger to submenu popover', () => {
    mount(<WithSubmenuInsideMenuExample />);

    // Open the submenu - real timers so requestAnimationFrame runs and popoverRef is set.
    cy.get('button').contains('More actions').first().trigger('mousemove');
    cy.get(menuSelector).should('have.length', 1);

    // Install clock AFTER submenu is fully rendered, following the safeZone test pattern in
    // react-menu. Installing it earlier freezes requestAnimationFrame, leaving popoverRef null.
    cy.clock(0).then(() => {
      // Simulate mouse crossing the outer MenuPopover area (going from trigger toward submenu).
      // mouseover on [role="grid"] bubbles to the outer MenuPopover where
      // mouseOverListenerCallbackRef fires dispatchMenuEnterEvent. The submenu's
      // useOnMenuMouseEnter listener sees the target is outside the submenu's popover and
      // schedules a close timeout (hoverDelay = 500ms, frozen by cy.clock).
      cy.get(gridSelector).trigger('mouseover');

      // Simulate mouse entering the submenu. mouseover on [role="menu"] bubbles to the
      // submenu's MenuPopover and triggers MenuPopover.onMouseEnter. Because the submenu has
      // isSubmenu=true (thanks to MenuListContext provided by MenuGrid), onMouseEnter calls
      // setOpen(open: true) → clearOpenTimeout(), cancelling the scheduled close.
      cy.get(menuSelector).trigger('mouseover');

      // Advance past the close delay (hoverDelay = 500ms)
      cy.tick(600);

      cy.get(menuSelector).should('have.length', 1);
    });
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

  it('should not open a submenu trigger with ArrowRight', () => {
    mount(<WithSubmenuExample />);
    cy.get(menuGridItemSelector).first().focus().realPress('ArrowRight').realPress('ArrowRight');
    cy.get(menuSelector).should('have.length', 0);
  });

  it('should open a submenu trigger with Enter', () => {
    mount(<WithSubmenuExample />);
    cy.get(menuGridItemSelector).first().focus().realPress('ArrowRight').realPress('Enter');
    cy.get(menuSelector).should('have.length', 1);
    cy.focused().should('have.attr', 'role', 'menuitem');
  });
});
