import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';
import { FluentProvider } from '@fluentui/react-provider';
import { webDarkThemeClassName } from '@fluentui/react-theme';
import * as React from 'react';

import { menuTriggerSelector, menuSelector } from '../../testing/selectors';

/**
 * Theming Phase 2b scoped-theming contract probe (committed as a test on purpose —
 * jsdom cannot resolve the var() cascade, so this is a browser test by necessity).
 *
 * The contract: a theme class (e.g. `webDarkThemeClassName` → `.fui-theme-web-dark`,
 * shipped as static CSS by @fluentui/react-tailwind-theme) on ANY DOM node themes that
 * node's subtree via custom-property cascade; siblings outside the subtree keep the
 * `:root, :host` web-light defaults; and surfaces PORTALED from inside a themed provider
 * carry the theme class to their portal mount node (FluentProvider propagates it through
 * ThemeClassNameContext).
 */

const WEB_LIGHT_BACKGROUND = 'rgb(255, 255, 255)'; // #ffffff
const WEB_DARK_BACKGROUND = 'rgb(41, 41, 41)'; // #292929
const WEB_DARK_FOREGROUND = 'rgb(255, 255, 255)'; // #ffffff

const probeStyle: React.CSSProperties = {
  backgroundColor: 'var(--color-neutral-background-1)',
  color: 'var(--color-neutral-foreground-1)',
};

describe('theme-class scoping (theming Phase 2b)', () => {
  it('a theme class on a subtree node themes it; a sibling outside stays web light', () => {
    // Deliberately NO FluentProvider: the theme class works on any DOM node.
    mountBase(
      <div>
        <div id="outside-probe" style={probeStyle}>
          outside
        </div>
        <div className={webDarkThemeClassName}>
          <div id="inside-probe" style={probeStyle}>
            inside
          </div>
        </div>
      </div>,
    );

    cy.get('#inside-probe').should('have.css', 'background-color', WEB_DARK_BACKGROUND);
    cy.get('#inside-probe').should('have.css', 'color', WEB_DARK_FOREGROUND);
    cy.get('#outside-probe').should('have.css', 'background-color', WEB_LIGHT_BACKGROUND);
  });

  it('a portaled menu opened from inside a themed provider carries the theme', () => {
    mountBase(
      <>
        <div id="sibling-probe" style={probeStyle}>
          sibling outside the provider
        </div>
        <FluentProvider themeClassName={webDarkThemeClassName}>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <button id={'menu-trigger'}>Menu trigger</button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Item</MenuItem>
              </MenuList>
              <div id="portal-probe" style={probeStyle}>
                popover probe
              </div>
            </MenuPopover>
          </Menu>
        </FluentProvider>
      </>,
    );

    cy.get(menuTriggerSelector).click();

    // The popover renders in a portal attached OUTSIDE the provider's DOM subtree —
    // the values can only come from the propagated theme class on the mount node.
    cy.get(menuSelector).should('exist');
    cy.get('#portal-probe').should('have.css', 'background-color', WEB_DARK_BACKGROUND);

    // The mount node itself carries the theme class (via ThemeClassNameContext).
    cy.get('#portal-probe').parents(`.${webDarkThemeClassName}`).should('have.length.at.least', 1);

    // A sibling outside the provider keeps the web-light defaults.
    cy.get('#sibling-probe').should('have.css', 'background-color', WEB_LIGHT_BACKGROUND);
  });
});
