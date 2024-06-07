import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import type { DrawerProps } from '../Drawer';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

export function testDrawerBaseScenarios(Component: React.ComponentType<DrawerProps>) {
  describe('basic functionality', () => {
    it('should not render any element when closed', () => {
      mountFluent(<Component id="drawer" />);

      cy.get('#drawer').should('not.exist');
    });

    it('should render an element when opened', () => {
      mountFluent(<Component id="drawer" open />);

      cy.get('#drawer').should('exist');
    });

    it('should render children content', () => {
      const content = 'Test the renderization';
      mountFluent(
        <Component id="drawer" open>
          {content}
        </Component>,
      );

      cy.get('#drawer').contains(content);
    });

    it('should toggle visibility on open prop change', () => {
      const ExampleDrawer = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <Component id="drawer" open={open} />
            <button id="button" onClick={() => setOpen(true)}>
              Open
            </button>
          </>
        );
      };

      mountFluent(<ExampleDrawer />);

      cy.get('#drawer').should('not.exist');
      cy.get('#button').click();
      cy.get('#drawer').should('exist');
    });
  });

  describe('size prop', () => {
    const sizes = {
      small: 320,
      medium: 592,
      large: 940,
      full: 1000,
    };

    Object.entries(sizes).forEach(([size, width]) => {
      const sizeProp = size as DrawerProps['size'];

      it(`should have correct size when size is ${size}`, () => {
        mountFluent(<Component size={sizeProp} id="drawer" open />);

        cy.viewport(1000, 1000);
        cy.get('#drawer').should('have.css', 'width', width + 'px');
        cy.get('#drawer').invoke('outerWidth').should('equal', width);
      });
    });

    it('width should not be bigger than viewport', () => {
      mountFluent(<Component id="drawer" open />);

      cy.viewport(319, 319);
      cy.get('#drawer').should('have.css', 'width', '319px');
      cy.get('#drawer').invoke('outerWidth').should('equal', 319);
    });

    it('should have custom size', () => {
      mountFluent(<Component id="drawer" open style={{ width: '200px' }} />);

      cy.get('#drawer').should('have.css', 'width', '200px');
      cy.get('#drawer').invoke('outerWidth').should('equal', 200);
    });
  });

  describe('position prop', () => {
    const positions = {
      start: 'left',
      end: 'right',
      bottom: 'bottom',
    };

    Object.entries(positions).forEach(([position, side]) => {
      const positionProp = position as DrawerProps['position'];

      it(`should have correct position when position is ${position}`, () => {
        mountFluent(<Component position={positionProp} id="drawer" open />);

        cy.get('#drawer').should('have.css', side, '0px');
      });
    });
  });
}
