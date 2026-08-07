import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

import { DrawerHeaderNavigation } from './DrawerHeaderNavigation';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider themeClassName={webLightThemeClassName}>{element}</FluentProvider>);
};

describe('DrawerHeaderNavigation', () => {
  it('should render drawer nav with correct tag name and content', () => {
    mountFluent(<DrawerHeaderNavigation id="drawer-nav">Content</DrawerHeaderNavigation>);

    cy.get('#drawer-nav').should('exist');
    cy.get('#drawer-nav').should('match', 'nav');
    cy.get('#drawer-nav').should('have.html', 'Content');
  });
});
