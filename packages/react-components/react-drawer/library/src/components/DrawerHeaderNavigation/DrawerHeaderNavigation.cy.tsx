import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { DrawerHeaderNavigation } from './DrawerHeaderNavigation';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('DrawerHeaderNavigation', () => {
  it('should render drawer nav with correct tag name and content', () => {
    mountFluent(<DrawerHeaderNavigation id="drawer-nav">Content</DrawerHeaderNavigation>);

    cy.get('#drawer-nav').should('exist');
    cy.get('#drawer-nav').should('match', 'nav');
    cy.get('#drawer-nav').should('have.html', 'Content');
  });
});
