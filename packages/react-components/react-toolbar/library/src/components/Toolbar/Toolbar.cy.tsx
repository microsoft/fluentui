import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';

import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarToggleButton,
  ToolbarRadioButton,
} from '@fluentui/react-toolbar';

const button = "[type='button']";

const mount = (element: JSXElement) => {
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

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('be.focused');

      cy.get(button).eq(0).type('{rightArrow}');
      cy.get(button).eq(1).should('be.focused');

      cy.get(button).eq(1).type('{downArrow}');
      cy.get(button).eq(2).should('be.focused');

      cy.get(button).eq(2).type('{upArrow}');
      cy.get(button).eq(1).should('be.focused');

      cy.get(button).eq(1).type('{leftArrow}');
      cy.get(button).eq(0).should('be.focused');
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

      cy.get(button).eq(3).click();
      cy.get(button).eq(3).should('be.focused');

      cy.get(button).eq(3).type('{rightArrow}');
      cy.get(button).eq(0).should('be.focused');

      cy.get(button).eq(0).type('{leftArrow}');
      cy.get(button).eq(3).should('be.focused');
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

      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'false');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'true');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-pressed', 'false');
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

      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'false');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');

      cy.get(button).eq(0).click();
      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');
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

      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'true');
      cy.get(button).eq(1).click();

      cy.get(button).eq(1).should('have.attr', 'aria-checked', 'true');
      cy.get(button).eq(0).should('have.attr', 'aria-checked', 'false');
    });
  });
});

describe('ToolbarDivider', () => {
  it('should focus first element', () => {
    mount(
      <Toolbar>
        <ToolbarButton>Item 1</ToolbarButton>
        <ToolbarButton>Item 2</ToolbarButton>
        <ToolbarDivider />
        <ToolbarButton>Item 3</ToolbarButton>
      </Toolbar>,
    );

    cy.get('html').type('Tab').type('{rightarrow}');
    cy.get(button).eq(0).should('be.focused');
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

    cy.get(button).eq(0).click();

    cy.get(button).eq(0).type('{rightarrow}');
    cy.get(button).eq(1).should('be.focused');
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

    cy.get(button).eq(0).click();

    cy.get(button).eq(0).type('{leftarrow}');
    cy.get(button).eq(2).should('be.focused');
  });
});
