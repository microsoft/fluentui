import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

import { testDrawerBaseScenarios } from '../../e2e/DrawerShared';
import { OverlayDrawer } from './OverlayDrawer';
import type { OverlayDrawerProps } from './OverlayDrawer.types';
import type { JSXElement } from '@fluentui/react-utilities';

/*
 * ── Selecting the backdrop after the D16 statics removal ────────────────────────────────
 *
 * `overlayDrawerClassNames` still exists, but it now holds ONE key — `root`, valued at the
 * component's group marker — so the `fui-OverlayDrawer__backdrop` selector these tests used
 * to build no longer exists, by design: sub-slots have no public class-name handle
 * (DECISIONS.md D16.1 / D16.5).
 *
 * The backdrop gets a probe class stamped by the fixture through the slot's `className`
 * prop. That is not a workaround — per-slot `className` IS the supported handle on a slot
 * under the new contract, so these tests now target the backdrop the same way a consumer
 * must. (A `data-testid` is not assignable: Fluent's slot-props types have no index
 * signature.)
 *
 * Stamping a `className` is behaviour-neutral for the assertions below. `useOverlayDrawer_unstable`
 * derives `hasCustomBackdrop` from `modalType !== 'non-modal' && slot.resolveShorthand(props.backdrop) !== null`,
 * and `{ className }` resolves to a non-null shorthand exactly as the default `undefined`
 * does — so a probe class changes nothing about WHEN the backdrop renders, which is what
 * three of these four assertions are about.
 */
const BACKDROP_PROBE = 'overlay-drawer-backdrop-probe';
const backdropSelector = `.${BACKDROP_PROBE}`;

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider themeClassName={webLightThemeClassName}>{element}</FluentProvider>);
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
          backdrop={{ className: BACKDROP_PROBE }}
          {...props}
        />
      );
    };

    describe('modalType="modal" prop', () => {
      it('should render backdrop', () => {
        mountFluent(<ExampleDrawer />);

        cy.get(backdropSelector).should('exist');
      });

      it('should close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer />);

        cy.get('#drawer').should('exist');
        cy.get(backdropSelector).click({ force: true });
        cy.get('#drawer').should('not.exist');
      });
    });

    describe('modalType="alert" prop', () => {
      it('should render backdrop', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get(backdropSelector).should('exist');
      });

      it('should not close when backdrop is clicked', () => {
        mountFluent(<ExampleDrawer modalType="alert" />);

        cy.get('#drawer').should('exist');
        cy.get(backdropSelector).click({ force: true });
        cy.get('#drawer').should('exist');
      });
    });

    describe('modalType="mon-modal" prop', () => {
      it('should not render backdrop when modalType is default', () => {
        mountFluent(<ExampleDrawer modalType="non-modal" />);

        cy.get(backdropSelector).should('not.exist');
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
