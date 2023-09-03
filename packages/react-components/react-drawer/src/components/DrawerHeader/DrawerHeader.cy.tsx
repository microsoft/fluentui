import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { DrawerHeader } from './DrawerHeader';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('DrawerHeader', () => {
  it('should render drawer header with correct tag name and content', () => {
    mountFluent(<DrawerHeader id="drawer-header">Content</DrawerHeader>);

    cy.get('#drawer-header').should('exist');
    cy.get('#drawer-header').should('match', 'header');
    cy.get('#drawer-header').should('have.html', 'Content');
  });
});
