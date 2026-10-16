import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Provider } from '@fluentui/react-headless-components-preview/provider';

import { InlineDrawer } from './index';
import type { JSXElement } from '@fluentui/react-utilities';
import { testDrawerBaseScenarios } from '../Drawer.cy';

const mountFluent = (element: JSXElement) => {
  mount(<Provider>{element}</Provider>);
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
