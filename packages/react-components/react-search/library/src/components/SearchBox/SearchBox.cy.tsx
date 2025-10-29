import 'cypress-real-events';
import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';
import { SearchBox, SearchBoxProps } from '@fluentui/react-search';

import { Field } from '@fluentui/react-field';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

describe('Search box', () => {
  it('clicking the search box should focus', () => {
    mount(
      <Field label="Example">
        <SearchBox appearance="outline" data-testid="searchbox" />
      </Field>,
    );

    cy.get('[data-testid="searchbox"]').click().should('have.focus');
  });

  it('clicking the X should delete', () => {
    mount(
      <Field label="Example">
        <SearchBox appearance="outline" data-testid="searchbox" />
      </Field>,
    );

    cy.get('[data-testid="searchbox"]').click().should('have.focus');
    cy.get('.fui-SearchBox__dismiss').click();
    cy.get('[data-testid="searchbox"]').should('be.empty');
  });

  it('clicking the X should delete text if there has been typing', () => {
    mount(
      <Field label="Example">
        <SearchBox appearance="outline" data-testid="searchbox" />
      </Field>,
    );

    cy.get('[data-testid="searchbox"]').click().should('have.focus');
    cy.get('[data-testid="searchbox"]').realType('something');
    cy.get('.fui-SearchBox__dismiss').click();
    cy.get('[data-testid="searchbox"]').should('be.empty');
  });

  it('hitting esc key should delete text if there has been typing', () => {
    mount(
      <Field label="Example">
        <SearchBox appearance="outline" data-testid="searchbox" />
      </Field>,
    );

    cy.get('[data-testid="searchbox"]').click().should('have.focus');
    cy.get('[data-testid="searchbox"]').realType('something');
    cy.get('[data-testid="searchbox"]').realPress('Escape');
    cy.get('[data-testid="searchbox"]').should('be.empty');
  });

  it('hitting esc key should delete text if there has been typing', () => {
    mount(
      <Field label="Example">
        <SearchBox appearance="outline" data-testid="searchbox" />
      </Field>,
    );

    cy.get('[data-testid="searchbox"]').click().should('have.focus');
    cy.get('[data-testid="searchbox"]').realType('something');
    cy.get('[data-testid="searchbox"]').realPress('Escape');
    cy.get('[data-testid="searchbox"]').should('be.empty');
  });
});
