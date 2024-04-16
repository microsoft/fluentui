import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  ToolbarRadioButton,
} from '@fluentui/react-toolbar';

const button = "[type='button']";

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Toolbar', () => {
  describe('Navigation', () => {
    it('should navigate with arrows', () => {
      mount(
        <Toolbar>
          <ToolbarButton>First</ToolbarButton>
          <ToolbarButton>Second</ToolbarButton>
          <ToolbarButton>Third</ToolbarButton>
          <ToolbarButton>Fourth</ToolbarButton>
        </Toolbar>,
      );

      cy.get(button)
        .eq(0)
        .focus()
        .get(button)
        .eq(0)
        .should('be.focused')
        // Navigate with right arrow to the right
        .type('{rightArrow}')
        .get(button)
        .eq(1)
        .should('be.focused')
        // Navigate with down arrow to the right
        .type('{downArrow}')
        .get(button)
        .eq(2)
        .should('be.focused')
        // Navigate with up arrow to the right
        .type('{upArrow}')
        .get(button)
        .eq(1)
        .should('be.focused')
        // Navigate with left arrow to the right
        .type('{leftArrow}')
        .get(button)
        .eq(0)
        .should('be.focused');
    });

    it('should have circular navigation', () => {
      mount(
        <Toolbar>
          <ToolbarButton>First</ToolbarButton>
          <ToolbarButton>Second</ToolbarButton>
          <ToolbarButton>Third</ToolbarButton>
          <ToolbarButton>Fourth</ToolbarButton>
        </Toolbar>,
      );

      cy.get(button)
        .eq(3)
        .focus()
        .get(button)
        .eq(3)
        .should('be.focused')
        // Navigate from last to first
        .type('{rightArrow}')
        .get(button)
        .eq(0)
        .should('be.focused')
        // Navigate from first to last
        .type('{leftArrow}')
        .get(button)
        .eq(3)
        .should('be.focused');
    });
  });

  describe('Toggle Button', () => {
    it('should toggle button state on click', () => {
      mount(
        <Toolbar>
          <ToolbarToggleButton name="group" value="first">
            First
          </ToolbarToggleButton>
        </Toolbar>,
      );

      cy.get(button)
        .eq(0)
        .focus()
        .get(button)
        .eq(0)
        .should('have.attr', 'aria-pressed', 'false')
        .get(button)
        .eq(0)
        .click()
        .get(button)
        .eq(0)
        .should('have.attr', 'aria-pressed', 'true');
    });

    it('should set default checked values', () => {
      mount(
        <Toolbar
          defaultCheckedValues={{
            group: ['first'],
          }}
        >
          <ToolbarToggleButton name="group" value="first">
            First
          </ToolbarToggleButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'true');
    });
  });

  describe('Radio Button', () => {
    it('should toggle button state on click', () => {
      mount(
        <Toolbar>
          <ToolbarRadioButton name="group" value="first">
            First
          </ToolbarRadioButton>
        </Toolbar>,
      );

      cy.get(button)
        .eq(0)
        .focus()
        .get(button)
        .eq(0)
        .should('have.attr', 'aria-checked', 'false')
        .get(button)
        .eq(0)
        .click()
        .get(button)
        .eq(0)
        .should('have.attr', 'aria-checked', 'true');
    });

    it('should set default checked values', () => {
      mount(
        <Toolbar
          defaultCheckedValues={{
            group: ['first'],
          }}
        >
          <ToolbarRadioButton name="group" value="first">
            First
          </ToolbarRadioButton>
        </Toolbar>,
      );

      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');
    });

    it('should check new value and uncheck previously checked', () => {
      mount(
        <Toolbar
          defaultCheckedValues={{
            group: ['first'],
          }}
        >
          <ToolbarRadioButton name="group" value="first">
            First
          </ToolbarRadioButton>
          <ToolbarRadioButton name="group" value="second">
            Second
          </ToolbarRadioButton>
        </Toolbar>,
      );

      cy.get(button)
        .eq(0)
        .should('have.attr', 'aria-checked', 'true')
        .get(button)
        .eq(1)
        .click()
        .get(button)
        .eq(1)
        .should('have.attr', 'aria-checked', 'true')
        .get(button)
        .eq(0)
        .should('have.attr', 'aria-checked', 'false');
    });
  });
});

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
