import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { testDrawerBaseScenarios } from '../../e2e/DrawerShared';
import { DrawerInline } from './DrawerInline';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('DrawerInline', () => {
  testDrawerBaseScenarios(DrawerInline);

  describe('separator prop', () => {
    it('should not render any border when separator is false', () => {
      mountFluent(<DrawerInline id="drawer" position="start" open />);

      cy.get('#drawer').should('not.have.css', `border-right-width`, '1px');
      cy.get('#drawer').should('not.have.css', `border-left-width`, '1px');
    });

    it('should render correct border when when position is `start`', () => {
      mountFluent(<DrawerInline id="drawer" position="start" separator open />);

      cy.get('#drawer').should('not.have.css', `border-left-width`, '1px');
      cy.get('#drawer').should('have.css', `border-right-width`, '1px');
    });

    it('should render correct border when when position is `end`', () => {
      mountFluent(<DrawerInline id="drawer" position="end" separator open />);

      cy.get('#drawer').should('not.have.css', `border-right-width`, '1px');
      cy.get('#drawer').should('have.css', `border-left-width`, '1px');
    });
  });
});
