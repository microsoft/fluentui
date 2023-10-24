import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { testDrawerBaseScenarios } from '../../e2e/DrawerShared';
import { OverlayDrawer } from './OverlayDrawer';
import { OverlayDrawerProps } from './OverlayDrawer.types';
import { overlayDrawerClassNames } from './useOverlayDrawerStyles.styles';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

describe('OverlayDrawer', () => {
  testDrawerBaseScenarios(OverlayDrawer);

  describe('modalType prop', () => {
    const ExampleDrawer = (props: OverlayDrawerProps) => {
      const [open, setOpen] = React.useState(true);

      return (
        <OverlayDrawer id="drawer" open={open} onOpenChange={(_, { open: isOpen }) => setOpen(isOpen)} {...props} />
      );
    };

    describe('modalType="modal" prop', () => {
      it('should render backdrop', () => {
        mountFluent(<ExampleDrawer />);

        cy.get(`.${overlayDrawerClassNames.backdrop}`).should('exist');
      });

      it('should close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer />);

        cy.get('#drawer').should('exist');
        cy.get(`.${overlayDrawerClassNames.backdrop}`).click({ force: true });
        cy.get('#drawer').should('not.exist');
      });
    });

    describe('modalType="alert" prop', () => {
      it('should render backdrop', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get(`.${overlayDrawerClassNames.backdrop}`).should('exist');
      });

      it('should not close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get('#drawer').should('exist');
        cy.get(`.${overlayDrawerClassNames.backdrop}`).click({ force: true });
        cy.get('#drawer').should('exist');
      });
    });

    describe('modalType="mon-modal" prop', () => {
      it('should not render backdrop when modalType is default', () => {
        mountFluent(<ExampleDrawer modalType="non-modal" />);

        cy.get(`.${overlayDrawerClassNames.backdrop}`).should('not.exist');
      });
    });
  });
});
