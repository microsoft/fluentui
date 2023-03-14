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
const fieldErrorMessageSelector = '[role=alert]';

describe('DatePicker', () => {
  it('opens a default datepicker', () => {
    mount(<DatePicker />);
    cy.get(inputSelector).click().get(popoverSelector).should('be.visible');
  });

  it('should not open a datepicker when disabled', () => {
    mount(<DatePicker disabled />);
    // Force is needed because otherwise Cypress throws an error
    cy.get(inputSelector).click({ force: true }).get(popoverSelector).should('not.exist');
  });

  it('should render DatePicker and calloutId must exist in the DOM when isDatePickerShown is set', () => {
    mount(<DatePicker />);
    cy.get(inputSelector).click();

    cy.get('body').find('[aria-owns]').should('exist');
  });

  it('should clear error message when required input has date text and allowTextInput is true', () => {
    mount(<DatePicker isRequired allowTextInput />);

    // Open DatePicker and dismiss
    cy.get(inputSelector).click().get('body').click().get(fieldErrorMessageSelector).should('exist');

    // Type a date and dismiss
    cy.get(inputSelector)
      .click()
      .type('Jan 1 2030')
      .get('body')
      .click()
      .get(fieldErrorMessageSelector)
      .should('not.exist');
  });

  it('clears error message when required input has date selected from calendar and allowTextInput is true', () => {
    mount(<DatePicker isRequired allowTextInput />);

    // Open picker and dismiss to show error message
    cy.get(inputSelector).click().get('body').click().get(fieldErrorMessageSelector).should('exist');

    // Select a date from calendar, we choose 10 since the first 0-6 days in the grid are not really dates, and dismiss
    cy.get(inputSelector)
      .click()
      .get('[role="gridcell"]')
      .its(10)
      .click()
      .get('body')
      .click()
      .get(fieldErrorMessageSelector)
      .should('not.exist');
  });

  it('should not clear initial error when datepicker is opened', () => {
    mount(<DatePicker isRequired allowTextInput maxDate={new Date('2020-04-01')} value={new Date('2020-04-02')} />);

    cy.get(fieldErrorMessageSelector).should('not.exist');

    // open and dismiss picker
    cy.get(inputSelector).click().get('body').click();

    cy.get(fieldErrorMessageSelector).should('exist');
  });

  it('should reset status message after selecting a valid date', () => {
    mount(<DatePicker allowTextInput initialPickerDate={new Date('2021-04-15')} />);

    cy.get(fieldErrorMessageSelector).should('not.exist');
    cy.get(inputSelector).click().type('test').get('body').click();
    cy.get(fieldErrorMessageSelector).should('exist');
    cy.get(inputSelector).click().get('[role="gridcell"]').its(10).click().get('body').click();
    cy.get(fieldErrorMessageSelector).should('not.exist');
  });
});
