import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('MenuTrigger', () => {
  it('should focus first element', () => {
    mount(
      <Toolbar>
        <ToolbarButton>Item 1</ToolbarButton>
        <ToolbarButton>Item 2</ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton>Item 3</ToolbarButton>
      </Toolbar>,
    );

    cy.get('html').type('Tab').type('{rightarrow}').get('[type="button"]').eq(0).should('be.focused');
  });

  it('should navigate with arrow key', () => {
    mount(
      <Toolbar>
        <ToolbarButton>Item 1</ToolbarButton>
        <ToolbarButton>Item 2</ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton>Item 3</ToolbarButton>
      </Toolbar>,
    );
    cy.get('[type="button"]')
      .eq(0)
      .focus()
      .type('{rightarrow}')
      .type('{rightarrow}')
      .get('[type="button"]')
      .eq(1)
      .should('be.focused');
  });

  it('should have circular navigation', () => {
    mount(
      <Toolbar>
        <ToolbarButton>Item 1</ToolbarButton>
        <ToolbarButton>Item 2</ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton>Item 3</ToolbarButton>
      </Toolbar>,
    );
    cy.get('[type="button"]').eq(0).focus().type('{leftarrow}').get('[type="button"]').eq(2).should('be.focused');
  });
});
