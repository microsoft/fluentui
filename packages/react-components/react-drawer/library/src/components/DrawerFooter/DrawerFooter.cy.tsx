import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { DrawerFooter } from './DrawerFooter';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('DrawerFooter', () => {
  it('should render drawer footer with correct tag name and content', () => {
    mountFluent(<DrawerFooter id="drawer-footer">Content</DrawerFooter>);

    cy.get('#drawer-footer').should('exist');
    cy.get('#drawer-footer').should('match', 'footer');
    cy.get('#drawer-footer').should('have.html', 'Content');
  });
});
