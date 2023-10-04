import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { dialogSurfaceClassNames } from '@fluentui/react-dialog';

import { testDrawerBaseScenarios } from '../../e2e/DrawerShared';
import { DrawerOverlay } from './DrawerOverlay';
import { DrawerOverlayProps } from './DrawerOverlay.types';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('DrawerOverlay', () => {
  testDrawerBaseScenarios(DrawerOverlay);

  describe('modalType prop', () => {
    const ExampleDrawer = (props: DrawerOverlayProps) => {
      const [open, setOpen] = React.useState(true);

      return (
        <DrawerOverlay id="drawer" open={open} onOpenChange={(_, { open: isOpen }) => setOpen(isOpen)} {...props} />
      );
    };

    describe('modalType="modal" prop', () => {
      it('should render backdrop', () => {
        mountFluent(<ExampleDrawer />);

        cy.get(`.${dialogSurfaceClassNames.backdrop}`).should('exist');
      });

      it('should close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer />);

        cy.get('#drawer').should('exist');
        cy.get(`.${dialogSurfaceClassNames.backdrop}`).click({ force: true });
        cy.get('#drawer').should('not.exist');
      });
    });

    describe('modalType="alert" prop', () => {
      it('should render backdrop', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get(`.${dialogSurfaceClassNames.backdrop}`).should('exist');
      });

      it('should not close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get('#drawer').should('exist');
        cy.get(`.${dialogSurfaceClassNames.backdrop}`).click({ force: true });
        cy.get('#drawer').should('exist');
      });
    });

    describe('modalType="mon-modal" prop', () => {
      it('should not render backdrop when modalType is default', () => {
        mountFluent(<ExampleDrawer modalType="non-modal" />);

        cy.get(`.${dialogSurfaceClassNames.backdrop}`).should('not.exist');
      });
    });
  });
});
