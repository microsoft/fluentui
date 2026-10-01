import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Provider } from '@fluentui/react-headless-components-preview/provider';

import { DrawerHeaderNavigation } from './index';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<Provider>{element}</Provider>);
};

describe('DrawerHeaderNavigation', () => {
  it('should render drawer nav with correct tag name and content', () => {
    mountFluent(<DrawerHeaderNavigation id="drawer-nav">Content</DrawerHeaderNavigation>);

    cy.get('#drawer-nav').should('exist');
    cy.get('#drawer-nav').should('match', 'nav');
    cy.get('#drawer-nav').should('have.html', 'Content');
  });
});
