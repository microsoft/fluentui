import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Provider } from '@fluentui/react-headless-components-preview/provider';

import type { JSXElement } from '@fluentui/react-utilities';

import { OverlayDrawer } from './index';
import type { OverlayDrawerProps } from './index';
import { testDrawerBaseScenarios } from '../Drawer.cy';

const mountFluent = (element: JSXElement) => {
  mount(<Provider>{element}</Provider>);
};

const LongPageContent = ({ children }: { children?: React.ReactNode }) => (
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
        <OverlayDrawer
          id="drawer"
          open={open}
          onOpenChange={(_, { open: isOpen }) => setOpen(isOpen)}
          style={{ width: 200, height: 100 }}
          {...props}
        />
      );
    };

    describe('modalType="modal" prop', () => {
      it('should render as a modal dialog', () => {
        mountFluent(<ExampleDrawer />);

        cy.get('#drawer').should('have.attr', 'open').and('have.attr', 'aria-modal', 'true');
      });

      it('should close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer />);

        cy.get('#drawer').should('exist');
        cy.get('#drawer').realClick({ x: -10, y: -10 });
        cy.get('#drawer').should('not.exist');
      });
    });

    describe('modalType="alert" prop', () => {
      it('should render as an alert dialog', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get('#drawer')
          .should('have.attr', 'open')
          .and('have.attr', 'aria-modal', 'true')
          .and('have.attr', 'role', 'alertdialog');
      });

      it('should not close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get('#drawer').should('exist');
        cy.get('#drawer').realClick({ x: -10, y: -10 });
        cy.get('#drawer').should('exist');
      });
    });

    describe('modalType="mon-modal" prop', () => {
      it('should render as a non-modal dialog', () => {
        mountFluent(<ExampleDrawer modalType="non-modal" />);

        cy.get('#drawer').should('not.have.attr', 'aria-modal');
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
