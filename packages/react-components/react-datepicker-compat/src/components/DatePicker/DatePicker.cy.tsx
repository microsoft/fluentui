import * as React from 'react';
import { mount as mountBase } from '@cypress/react';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';

import { DatePicker } from './DatePicker';

const mount = (element: JSX.Element) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

const inputSelector = '[role="combobox"]';
const popoverSelector = '[role="dialog"]';

describe('DatePicker', () => {
  it('opens a default datepicker', () => {
    mount(<DatePicker />);

    cy.focused().should('not.exist');
    cy.get(inputSelector).click().get(popoverSelector).should('be.visible');
  });

  it('should not open a datepicker when disabled', () => {
    mount(<DatePicker disabled />);
    // Force is needed because otherwise Cypress throws an error
    cy.get(inputSelector).click({ force: true }).get(popoverSelector).should('not.exist');
  });

  it('should render DatePicker and popupId must exist in the DOM when the popup is open', () => {
    mount(<DatePicker />);
    cy.get(inputSelector).click();

    cy.get('body').find('[aria-owns]').should('exist');
  });

  it('should move focus back to the input when the popup is closed', () => {
    mount(<DatePicker inlinePopup />);
    cy.get(inputSelector).focus().realPress('Enter').realPress('Escape');
    cy.focused().should('have.attr', 'role', 'combobox');
  });

  it('should open on keydown', () => {
    mount(<DatePicker inlinePopup />);
    cy.get(inputSelector).focus().realPress('ArrowDown').get(popoverSelector).should('be.visible');
  });
});
