import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import type { TimePickerProps } from '@fluentui/react-timepicker-compat';
import { TimePicker } from '@fluentui/react-timepicker-compat';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
};

/*
 * ── Selecting TimePicker's clear icon after the D16 statics removal ──────────────────────
 *
 * TimePicker renders through Combobox, so this file used to reach the clear icon with
 * `.fui-Combobox__clearIcon`. That static no longer exists: `comboboxClassNames` holds ONE key
 * now — `root`, valued at Combobox's group marker — and the per-slot `input` / `expandIcon` /
 * `clearIcon` keys were removed with every other BEM static (DECISIONS.md D16.1 / D16.5). The
 * classes the slot actually carries are hashed CSS-module tokens, unaddressable from here.
 *
 * So the fixtures stamp a probe class through the slot's `className` prop, the same way
 * Card.cy.tsx does. That is not a workaround — per-slot `className` IS the supported handle on
 * a slot under the new contract, so this targets the internal the way a consumer must. (A
 * `data-testid` would read more conventionally but is not assignable: Fluent's slot-props types
 * have no index signature, so an object literal rejects `data-*`.)
 *
 * Passing `clearIcon` is behaviour-neutral for the assertions below. `useCombobox_unstable`
 * builds the slot with `slot.optional(props.clearIcon, { renderByDefault: true, … })` and then
 * defaults `children ??= <DismissIcon />`, so supplying only a `className` changes neither
 * WHETHER the icon renders nor WHAT it renders — and `showClearIcon` (which drives the
 * `display: none` state class) still derives solely from `selectedOptions` / `clearable` /
 * `disabled` / `multiselect`.
 */
const CLEAR_ICON_PROBE = 'timepicker-clear-icon-probe';

const Default = ({ freeform, clearable }: Pick<TimePickerProps, 'freeform' | 'clearable'>) => {
  const [selectedTimeText, setSelectedTimeText] = React.useState<string | undefined>(undefined);
  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTimeText(data.selectedTimeText);
  };
  return (
    <div>
      <TimePicker
        freeform={freeform}
        clearable={clearable}
        startHour={10}
        endHour={20}
        increment={60}
        onTimeChange={onTimeChange}
        hourCycle="h23"
        clearIcon={{ className: CLEAR_ICON_PROBE }}
      />
      {<div id="selected-time-text">{selectedTimeText}</div>}
    </div>
  );
};

const Controlled = ({ freeform, clearable }: Pick<TimePickerProps, 'freeform' | 'clearable'>) => {
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [selectedTimeText, setSelectedTimeText] = React.useState<string | undefined>(undefined);
  const [value, setValue] = React.useState<string>('');

  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setSelectedTimeText(data.selectedTimeText);
    setValue(data.selectedTimeText ?? '');
  };
  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  return (
    <div>
      <TimePicker
        freeform={freeform}
        clearable={clearable}
        startHour={10}
        endHour={20}
        increment={60}
        hourCycle="h23"
        selectedTime={selectedTime}
        onTimeChange={onTimeChange}
        value={value}
        onInput={onInput}
        clearIcon={{ className: CLEAR_ICON_PROBE }}
      />
      {<div id="selected-time-text">{selectedTimeText}</div>}
    </div>
  );
};

const inputSelector = '[role="combobox"]';
const optionSelector = (index: number) => `[role="option"]:nth-of-type(${index + 1})`;
const clearIconSelector = `.${CLEAR_ICON_PROBE}`;

describe('TimePicker', () => {
  [
    { Example: Default, name: 'uncontrolled' },
    { Example: Controlled, name: 'controlled' },
  ].forEach(({ Example, name }) => {
    it(`${name} should open dropdown when clicked`, () => {
      mount(<Example />);
      cy.get(inputSelector).click().get(optionSelector(0)).should('be.visible');
    });

    it(`${name} should select first option on Enter`, () => {
      mount(<Example />);
      cy.get(inputSelector).click().realPress('Enter').get(inputSelector).should('have.value', '10:00');
      cy.get('#selected-time-text').should('have.text', '10:00');
    });

    it(`${name} should select second option on ArrowDown+Enter`, () => {
      mount(<Example />);
      cy.get(inputSelector)
        .click()
        .realPress('ArrowDown')
        .realPress('Enter')
        .get(inputSelector)
        .should('have.value', '11:00');
      cy.get('#selected-time-text').should('have.text', '11:00');
    });

    it(`${name} should select third option on Click`, () => {
      mount(<Example />);
      cy.get(inputSelector).click().get(optionSelector(2)).click().get(inputSelector).should('have.value', '12:00');
      cy.get('#selected-time-text').should('have.text', '12:00');
    });

    it(`${name} should select option matching prefix on Enter`, () => {
      mount(<Example />);
      cy.get(inputSelector).click().type('14{enter}').get(inputSelector).should('have.value', '14:00');
      cy.get('#selected-time-text').should('have.text', '14:00');
    });

    it(`${name} should select 1st option on Enter when no option has matching prefix`, () => {
      mount(<Example />);
      cy.get(inputSelector).click().type('a{enter}').get(inputSelector).should('have.value', '10:00');
      cy.get('#selected-time-text').should('have.text', '10:00');
    });

    describe('freeform', () => {
      it(`${name} should select option matching prefix on Enter`, () => {
        mount(<Example freeform />);
        cy.get(inputSelector).click().type('14{enter}').get(inputSelector).should('have.value', '14:00');
        cy.get('#selected-time-text').should('have.text', '14:00');
      });

      it(`${name} should keep input value as is on Enter when no option has matching prefix`, () => {
        mount(<Example freeform />);
        cy.get(inputSelector).click().type('a{enter}').get(inputSelector).should('have.value', 'a');
        cy.get('#selected-time-text').should('have.text', 'a');
      });

      it(`${name} should select input value on blur`, () => {
        mount(<Example freeform />);
        cy.get(inputSelector).click().type('a').get(inputSelector).should('have.value', 'a');
        cy.get('#selected-time-text').should('have.text', '');
        cy.realPress('Tab');
        cy.get('#selected-time-text').should('have.text', 'a');
      });

      it(`${name} should select input value only on change`, () => {
        mount(<Example freeform />);
        cy.get(inputSelector).click().type('10:3').get(inputSelector).should('have.value', '10:3');
        cy.realPress('Tab');
        cy.get('#selected-time-text').should('have.text', '10:3');

        cy.get(inputSelector).click().type('0').get(inputSelector).should('have.value', '10:30');
        cy.get('#selected-time-text').should('have.text', '10:3');

        cy.realPress('Tab');
        cy.get('#selected-time-text').should('have.text', '10:30');
      });
    });

    describe('clearable', () => {
      it(`${name} should clear input on clear icon click`, () => {
        mount(<Example clearable />);
        cy.get(inputSelector).click().realPress('Enter').get(inputSelector).should('have.value', '10:00');
        cy.get(clearIconSelector).click().get(inputSelector).should('have.value', '');
        cy.get('#selected-time-text').should('have.text', '');
      });

      it(`freeform ${name} should clear input on clear icon click`, () => {
        mount(<Example clearable freeform />);
        cy.get(inputSelector).click().type('14{enter}').get(inputSelector).should('have.value', '14:00');
        cy.get(clearIconSelector).click().get(inputSelector).should('have.value', '');
        cy.get('#selected-time-text').should('have.text', '');
      });
    });
  });
});

describe('TimePicker with custom parsing', () => {
  const Example = () => {
    const [anchor] = React.useState(() => new Date(2023, 1, 1));
    const formatDateToTimeString = (date: Date) => {
      const localeTimeString = date.toLocaleTimeString([], {
        hour: 'numeric',
        hourCycle: 'h23',
        minute: '2-digit',
      });
      if (date.getHours() < 12) {
        return `Morning: ${localeTimeString}`;
      }
      if (date.getHours() === 12) {
        return `noon: ${localeTimeString}`;
      }
      return `Afternoon: ${localeTimeString}`;
    };

    const parseTimeStringToDate: TimePickerProps['parseTimeStringToDate'] = (time: string | undefined) => {
      if (!time) {
        return { date: null };
      }

      const [hours, minutes] = (time.split(' ')[1].match(/\d+/g) ?? []).map(Number);
      const date = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), hours, minutes);

      return { date };
    };

    const [selectedTimeText, setSelectedTimeText] = React.useState<string | undefined>(undefined);
    const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
      setSelectedTimeText(data.selectedTimeText);
    };
    return (
      <div>
        <TimePicker
          freeform
          dateAnchor={anchor}
          startHour={9}
          endHour={14}
          increment={60}
          hourCycle="h23"
          formatDateToTimeString={formatDateToTimeString}
          parseTimeStringToDate={parseTimeStringToDate}
          onTimeChange={onTimeChange}
        />
        {<div id="selected-time-text">{selectedTimeText}</div>}
      </div>
    );
  };
  it('letter navigation should be case insensitive and select option on enter', () => {
    mount(<Example />);
    cy.get(inputSelector).click().get(optionSelector(0)).should('be.visible');

    cy.get(inputSelector).click().type('a').realPress('Enter');
    cy.get(inputSelector).should('have.value', 'Afternoon: 13:00');
    cy.get('#selected-time-text').should('have.text', 'Afternoon: 13:00');

    cy.get(inputSelector).clear().click().type('N').realPress('Enter');
    cy.get(inputSelector).should('have.value', 'noon: 12:00');
    cy.get('#selected-time-text').should('have.text', 'noon: 12:00');
  });
});
