import * as React from 'react';
import { mount } from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { dialogSurfaceClassNames } from '@fluentui/react-dialog';

import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer.types';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};
const backdropSelector = `.${dialogSurfaceClassNames.backdrop}`;

const ControlledDrawer = ({ open: initialOpen = false, ...props }: DrawerProps) => {
  const [isOpen, setIsOpen] = React.useState(initialOpen);

  React.useEffect(() => setIsOpen(initialOpen), [initialOpen]);

  return <Drawer id="drawer" open={isOpen} onOpenChange={(_, { open }) => setIsOpen(open)} {...props} />;
};

describe('Drawer', () => {
  it('render drawer component', () => {
    mountFluent(<Drawer id="drawer" />);

    cy.get('#drawer').should('not.exist');
  });

  it('should toggle drawer visibility on open', () => {
    const ExampleDrawer = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <>
          <ControlledDrawer position="end" open={open} />
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

  it('should dismiss the drawer when clicking the backdrop', () => {
    mountFluent(<ControlledDrawer open />);

    cy.get('#drawer').should('exist');
    cy.get(backdropSelector).click({ force: true });
    cy.get('#drawer').should('not.exist');
  });

  it('should NOT dismiss the drawer when clicking on the backdrop if `modalType` is `alert`', () => {
    mountFluent(<ControlledDrawer open modalType={'alert'} />);

    cy.get('#drawer').should('exist');
    cy.get(backdropSelector).click({ force: true });
    cy.get('#drawer').should('exist');
  });
});
