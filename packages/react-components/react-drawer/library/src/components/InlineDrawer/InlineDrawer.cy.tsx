import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { testDrawerBaseScenarios } from '../../e2e/DrawerShared';
import { InlineDrawer } from './InlineDrawer';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('InlineDrawer', () => {
  testDrawerBaseScenarios(InlineDrawer);

  describe('separator prop', () => {
    it('should render correct border when when position is `start`', () => {
      mountFluent(<InlineDrawer id="drawer" position="start" separator open />);

      cy.get('#drawer').should('not.have.css', `border-right-color`, 'transparent');
    });

    it('should render correct border when when position is `end`', () => {
      mountFluent(<InlineDrawer id="drawer" position="end" separator open />);

      cy.get('#drawer').should('not.have.css', `border-left-color`, 'transparent');
    });

    it('should render correct border when when position is `bottom`', () => {
      mountFluent(<InlineDrawer id="drawer" position="bottom" separator open />);

      cy.get('#drawer').should('not.have.css', `border-left-width`, '1px');
      cy.get('#drawer').should('not.have.css', `border-right-width`, '1px');
      cy.get('#drawer').should('have.css', `border-top-width`, '1px');
    });
  });
});
