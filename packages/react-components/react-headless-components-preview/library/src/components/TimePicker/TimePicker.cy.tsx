import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';

import { TimePicker } from '.';
import type { TimePickerProps } from '.';

// ---- Selectors ----
// The TimePicker `id` prop maps to the trigger <input> element.
const trigger = '#timepicker';
const listbox = '[role="listbox"]';
const option = '[role="option"]';
const selectedTime = '#selected-time';

// ---- Fixtures ----

const dateAnchor = new Date(2023, 9, 1);

const BasicTimePicker = (props: Partial<TimePickerProps>) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <>
      <TimePicker
        id="timepicker"
        aria-label="Time"
        dateAnchor={dateAnchor}
        startHour={9}
        endHour={12}
        hourCycle="h23"
        onChange={(_ev, data) => {
          setValue(`${data.displayValue ?? ''}|${data.errorType ?? ''}`);
        }}
        {...props}
      />
      <div id="selected-time">{value}</div>
      <button id="outside">Outside</button>
    </>
  );
};

// ---- Tests ----

describe('TimePicker', () => {
  it('opens on trigger click and renders generated options', () => {
    mount(<BasicTimePicker />);
    cy.get(listbox).should('not.exist');
    cy.get(trigger).realClick();
    cy.get(listbox).should('exist');
    cy.get(option).should('have.length', 6).first().should('have.text', '09:00');
  });

  it('selects an option with ArrowDown and Enter', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).focus().realPress('ArrowDown');
    cy.get(trigger).realPress('ArrowDown');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', '09:30');
    cy.get(selectedTime).should('have.text', '09:30|');
  });

  it('closes on Escape without selecting', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).realClick();
    cy.get(listbox).should('exist');
    cy.get(trigger).realPress('Escape');
    cy.get(listbox).should('not.exist');
    cy.get(selectedTime).should('have.text', '');
  });

  describe('freeform', () => {
    it('keeps the typed value on Enter when no option matches', () => {
      mount(<BasicTimePicker freeform />);
      cy.get(trigger).realClick().realType('13:15');
      cy.get(trigger).realPress('Enter');
      cy.get(trigger).should('have.value', '13:15');
      cy.get(selectedTime).should('have.text', '13:15|out-of-bounds');
    });

    it('commits the typed text when focus leaves the TimePicker', () => {
      mount(<BasicTimePicker freeform />);
      cy.get(trigger).realClick().realType('10:10');
      cy.get('#outside').realClick();
      cy.get(selectedTime).should('have.text', '10:10|');
    });

    it('does not commit when focus moves to the listbox', () => {
      mount(<BasicTimePicker freeform />);
      cy.get(trigger).realClick().realType('10:10');
      cy.get(listbox).realClick({ position: 'top' });
      cy.get(selectedTime).should('have.text', '');
    });
  });
});
