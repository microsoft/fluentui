import * as React from 'react';
import { mount } from '@cypress/react';
import type {} from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Drawer } from '@fluentui/react-drawer';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
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
          <Drawer open={open} id="drawer" />
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
