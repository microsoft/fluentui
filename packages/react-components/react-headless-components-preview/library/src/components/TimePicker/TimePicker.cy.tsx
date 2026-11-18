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
const clearIcon = '#clear-icon';

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

  it('in freeform mode, does not commit when focus moves to the listbox', () => {
    mount(<BasicTimePicker freeform />);
    cy.get(trigger).realClick().realType('10:10');
    cy.get(listbox).realClick({ position: 'top' });
    cy.get(selectedTime).should('have.text', '');
  });

  it('selects an option on click', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).realClick();
    cy.get(option).eq(2).realClick();
    cy.get(trigger).should('have.value', '10:00');
    cy.get(selectedTime).should('have.text', '10:00|');
  });

  it('selects the option matching the typed prefix on Enter', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).realClick().realType('11');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', '11:00');
    cy.get(selectedTime).should('have.text', '11:00|');
  });

  it('selects the first option on Enter when no option matches the typed prefix', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).realClick().realType('a');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', '09:00');
    cy.get(selectedTime).should('have.text', '09:00|');
  });

  it('in freeform mode, selects the option matching the typed prefix on Enter', () => {
    mount(<BasicTimePicker freeform />);
    cy.get(trigger).realClick().realType('11');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', '11:00');
    cy.get(selectedTime).should('have.text', '11:00|');
  });

  it('in freeform mode, commits only text that changed', () => {
    mount(<BasicTimePicker freeform />);
    cy.get(trigger).realClick().realType('10:1');
    cy.get('#outside').realClick();
    cy.get(selectedTime).should('have.text', '10:1|invalid-input');

    cy.get(trigger).realClick().realType('5');
    cy.get(selectedTime).should('have.text', '10:1|invalid-input');
    cy.get('#outside').realClick();
    cy.get(selectedTime).should('have.text', '10:15|');
  });

  it('clears the value with the clear icon', () => {
    mount(<BasicTimePicker clearable clearIcon={{ id: 'clear-icon', children: 'x' }} />);
    cy.get(trigger).realClick();
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', '09:00');
    cy.get(clearIcon).realClick();
    cy.get(trigger).should('have.value', '');
    cy.get(selectedTime).should('have.text', '|');
  });
});

describe('TimePicker with custom formatting and parsing', () => {
  const Example = () => {
    const formatDateToTimeString = (date: Date) => {
      const time = date.toLocaleTimeString([], { hour: 'numeric', hourCycle: 'h23', minute: '2-digit' });
      if (date.getHours() < 12) {
        return `Morning: ${time}`;
      }
      if (date.getHours() === 12) {
        return `noon: ${time}`;
      }
      return `Afternoon: ${time}`;
    };

    const parseTimeStringToDate: TimePickerProps['parseTimeStringToDate'] = time => {
      if (!time) {
        return { date: null };
      }
      const [hours, minutes] = (time.split(' ')[1]?.match(/\d+/g) ?? []).map(Number);
      return { date: new Date(dateAnchor.getFullYear(), dateAnchor.getMonth(), dateAnchor.getDate(), hours, minutes) };
    };

    return (
      <BasicTimePicker
        freeform
        startHour={9}
        endHour={14}
        increment={60}
        formatDateToTimeString={formatDateToTimeString}
        parseTimeStringToDate={parseTimeStringToDate}
      />
    );
  };

  it('matches typed letters case-insensitively and selects the option on Enter', () => {
    mount(<Example />);
    cy.get(trigger).realClick().realType('a');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', 'Afternoon: 13:00');
    cy.get(selectedTime).should('have.text', 'Afternoon: 13:00|');

    cy.get(trigger).clear().realClick().realType('N');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', 'noon: 12:00');
    cy.get(selectedTime).should('have.text', 'noon: 12:00|');
  });
});
