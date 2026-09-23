import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { Provider } from '@fluentui/react-headless-components-preview/provider';

import type { JSXElement } from '@fluentui/react-utilities';

import { OverlayDrawer, overlayDrawerClassNames } from './index';
import type { OverlayDrawerProps } from './index';
import { Drawer } from '../Drawer';
import { InlineDrawer } from '../InlineDrawer';

const mountFluent = (element: JSXElement) => {
  mount(<Provider>{element}</Provider>);
};

function testDrawerBaseScenarios(Component: typeof Drawer | typeof OverlayDrawer | typeof InlineDrawer): void {
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
}

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
