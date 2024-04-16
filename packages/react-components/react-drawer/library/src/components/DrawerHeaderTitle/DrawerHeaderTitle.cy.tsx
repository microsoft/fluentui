import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { DrawerHeaderTitle } from './DrawerHeaderTitle';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('DrawerHeaderTitle', () => {
  it('should render drawer title with correct tag name', () => {
    mountFluent(<DrawerHeaderTitle id="drawer-title">Content</DrawerHeaderTitle>);

    cy.get('#drawer-title').should('exist');
    cy.get('#drawer-title').should('match', 'div');
  });

  it('should render children H2 tag by default', () => {
    mountFluent(<DrawerHeaderTitle id="drawer-title">Content</DrawerHeaderTitle>);

    cy.get('#drawer-title').contains('h2', 'Content');
  });

  it('should render different heading when provided', () => {
    mountFluent(
      <DrawerHeaderTitle id="drawer-title" heading={{ as: 'h1' }}>
        Content
      </DrawerHeaderTitle>,
    );

    cy.get('#drawer-title').contains('h1', 'Content');
  });

  it('should render action when provided', () => {
    mountFluent(
      <DrawerHeaderTitle id="drawer-title" action={<button>Action</button>}>
        Content
      </DrawerHeaderTitle>,
    );

    cy.get('#drawer-title').contains('h2', 'Content');
    cy.get('#drawer-title').contains('button', 'Action');
  });
});
