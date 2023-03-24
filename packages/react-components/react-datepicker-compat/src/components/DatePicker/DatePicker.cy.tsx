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
    cy.get(inputSelector).click().get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('exist');

    // Type a date and dismiss
    cy.get(inputSelector).click().click().type('Jan 1 2030').get('body').click('bottomRight');

    cy.get(fieldErrorMessageSelector).should('not.exist');
  });

  it('clears error message when required input has date selected from calendar and allowTextInput is true', () => {
    mount(<DatePicker isRequired allowTextInput />);

    // Open picker and dismiss to show error message
    cy.get(inputSelector).click().get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('exist');

    // Select a date from calendar, we choose 10 since the first 0-6 days in the grid are not really dates, and dismiss
    cy.get(inputSelector).click().get('[role="gridcell"]').its(10).click().get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('not.exist');
  });

  it('should not clear initial error when datepicker is opened', () => {
    mount(<DatePicker isRequired allowTextInput maxDate={new Date('2020-04-01')} value={new Date('2020-04-02')} />);

    cy.get(fieldErrorMessageSelector).should('exist');

    // open and dismiss picker
    cy.get(inputSelector).click().get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('exist');
  });

  it('should reset status message after selecting a valid date', () => {
    mount(<DatePicker allowTextInput initialPickerDate={new Date('2021-04-15')} />);

    cy.get(fieldErrorMessageSelector).should('not.exist');
    cy.get(inputSelector).click().click().type('test').get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('exist');
    cy.get(inputSelector).click().get('[role="gridcell"]').its(10).click().get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('not.exist');
  });
});

describe('When boundaries are specified', () => {
  const defaultDate = new Date('Dec 15 2017');
  const minDate = new Date('Jan 1 2017');
  const maxDate = new Date('Dec 31 2017');
  const strings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Go to today',
    isOutOfBoundsErrorMessage: 'out of bounds',
  };

  beforeEach(() => {
    mount(<DatePicker allowTextInput minDate={minDate} maxDate={maxDate} value={defaultDate} strings={strings} />);
  });

  it('should throw validation error for date outside boundary', () => {
    // Before min date
    cy.get(inputSelector).click().click().clear().type('Jan 1 2010{enter}').get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('exist').should('have.text', 'out of bounds');

    // After max date
    cy.get(inputSelector).click().click().clear().type('Jan 1 2020{enter}').get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('exist').should('have.text', 'out of bounds');
  });

  it('should not throw validation error for date inside boundary', () => {
    // In boundary
    cy.get(inputSelector).click().click().clear().type('Dec 16 2017{enter}').get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('not.exist');

    // In boundary
    cy.get(inputSelector).click().click().clear().type('Jan 1 2017{enter}').get('body').click('bottomRight');
    cy.get(fieldErrorMessageSelector).should('not.exist');
  });
});
