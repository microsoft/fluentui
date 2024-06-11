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

const LongPageContent = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    {Array.from({ length: 10 }).map((_, index) => (
      <p key={index}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, animi? Quos, eum pariatur. Labore magni vel
        doloremque reiciendis, consequatur porro explicabo similique harum illo, ad hic, earum nobis accusantium quasi?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eligendi impedit culpa ea ipsum voluptate
        inventore labore, delectus nam veniam dolor debitis dolorem blanditiis in, natus deleniti illo. Asperiores,
        porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati aperiam recusandae. Pariatur
        dolorem cumque odit delectus voluptates ea ipsam culpa voluptate? Praesentium beatae corrupti accusamus.
        Suscipit voluptas natus illo?
      </p>
    ))}
    {children}
  </>
);

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

  describe('body scroll', () => {
    it('should hide scroll when opened', () => {
      const ExampleDrawer = (props: OverlayDrawerProps) => {
        const [open, setOpen] = React.useState(true);

        return (
          <LongPageContent>
            <OverlayDrawer id="drawer" open={open} onOpenChange={(_, { open: isOpen }) => setOpen(isOpen)} {...props} />
            <button id="button" onClick={() => setOpen(!open)}>
              Toggle Drawer
            </button>
          </LongPageContent>
        );
      };

      mountFluent(<ExampleDrawer />);

      cy.viewport(600, 300);
      cy.get('html').should('have.css', 'overflow-y', 'clip');
      cy.get('#button').click({ force: true });
      cy.get('html').should('have.css', 'overflow-y', 'visible');
    });
  });
});
