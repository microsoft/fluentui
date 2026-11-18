import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';

import { TimePicker } from '.';
import type { TimePickerProps } from '.';
import { formatDateToTimeString as formatTime } from './utils/timeMath';

// ---- Selectors ----
// The TimePicker `id` prop maps to the trigger <input> element.
const trigger = '#timepicker';
const listbox = '[role="listbox"]';
const option = '[role="option"]';
const selectedTime = '#selected-time';
const clearIcon = '#clear-icon';

// ---- Fixtures ----

const dateAnchor = new Date(2023, 9, 1);
const firstSuggestion = formatTime(new Date(2023, 9, 1, 9), { locale: 'en-GB', hourCycle: 'h23' });
const secondSuggestion = formatTime(new Date(2023, 9, 1, 9, 30), { locale: 'en-GB', hourCycle: 'h23' });

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
        locale="en-GB"
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
    cy.get(option).should('have.length', 6).first().should('have.text', firstSuggestion);
  });

  it('selects an option with ArrowDown and Enter', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).focus().realPress('ArrowDown');
    cy.get(trigger).realPress('ArrowDown');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', secondSuggestion);
    cy.get(selectedTime).should('have.text', `${secondSuggestion}|`);
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

  it('retains invalid text instead of selecting an unrelated suggestion', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).realClick().realType('a');
    cy.get(trigger).realPress('Enter');
    cy.get(trigger).should('have.value', 'a').and('have.attr', 'aria-invalid', 'true');
    cy.get(selectedTime).should('have.text', 'a|invalid-input');
  });

  it('filters suggestions and commits an off-step custom time by default', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).realClick().realType('10:');
    cy.get(option).should('have.length', 2);
    cy.get(trigger).realType('17').realPress('Enter');
    cy.get(trigger).should('have.value', '10:17').and('be.focused');
    cy.get(selectedTime).should('have.text', '10:17|');
    cy.get(listbox).should('not.exist');
  });

  it('validates on Tab out without committing the active suggestion or reclaiming focus', () => {
    mount(<BasicTimePicker />);
    cy.get(trigger).realClick().realType('10:').realPress('ArrowDown');
    cy.get(trigger).realPress('Tab');
    cy.get('#outside').should('be.focused');
    cy.get(trigger).should('have.value', '10:').and('have.attr', 'aria-invalid', 'true');
    cy.get(selectedTime).should('have.text', '10:|invalid-input');
  });

  it('tabs to the native Clear button without validating and returns focus after clearing', () => {
    mount(<BasicTimePicker clearable clearIcon={{ id: 'clear-icon', children: 'x' }} />);
    cy.get(trigger).realClick().realType('10:17').realPress('Tab');
    cy.get(clearIcon).should('be.focused').and('match', 'button');
    cy.get(selectedTime).should('have.text', '');
    cy.get(clearIcon).realPress('Space');
    cy.get(trigger).should('be.focused').and('have.value', '');
    cy.get(clearIcon).should('not.exist');
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
    cy.get(trigger).should('have.value', firstSuggestion);
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
