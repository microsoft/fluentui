import * as React from 'react';
import { DatePicker } from '../../index';
import type { DatePickerOpenChangeData, DatePickerProps } from '../../index';

describe('DatePicker public types', () => {
  it('accepts native input refs, string unions, slots, and event/data handlers', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const calendarRef = React.createRef<HTMLDivElement>();
    const props: DatePickerProps = {
      value: null,
      size: 'small',
      appearance: 'filled-darker',
      calendar: { ref: calendarRef, firstDayOfWeek: 'monday', dateRangeType: 'week', layout: 'overlay' },
      onDateChange: (event, data) => {
        const date: Date | null = data.value;
        const range: Date[] = data.selectedDateRange;
        const reason: 'calendar' | 'input' | 'clear' = data.reason;
        expect([event, date, range, reason]).toBeDefined();
      },
      onValidationResult: (event, data) => {
        const error: 'invalid-input' | 'out-of-bounds' | 'required-input' | undefined = data.error;
        expect([event, error]).toBeDefined();
      },
      onOpenChange: (event, data) => {
        const open: boolean = data.open;
        const reason: DatePickerOpenChangeData['reason'] = data.reason;
        expect([event, open, reason]).toBeDefined();
      },
    };
    expect(<DatePicker {...props} ref={inputRef} />).toBeTruthy();
  });

  it('rejects string selection and invalid string unions', () => {
    // @ts-expect-error DatePicker selection is a date, not Input text.
    const value: DatePickerProps = { value: '2030-01-15' };
    // @ts-expect-error DatePicker owns the native input type.
    const type: DatePickerProps = { type: 'date' };
    // @ts-expect-error Editable mode is configured with allowTextInput.
    const readOnly: DatePickerProps = { readOnly: false };
    // @ts-expect-error V9 sizes are string unions.
    const size: DatePickerProps = { size: 'compact' };
    // @ts-expect-error Calendar weekdays are string unions, not legacy numeric enums.
    const weekday: DatePickerProps = { calendar: { firstDayOfWeek: 1 } };
    expect([value, type, readOnly, size, weekday]).toHaveLength(5);
  });

  it('reserves shared Calendar selection, boundaries, and reference date', () => {
    // @ts-expect-error Selection belongs on DatePicker.
    const value: DatePickerProps = { calendar: { value: null } };
    // @ts-expect-error Default selection belongs on DatePicker.
    const defaultValue: DatePickerProps = { calendar: { defaultValue: null } };
    // @ts-expect-error The reference date belongs on DatePicker.
    const today: DatePickerProps = { calendar: { today: new Date() } };
    // @ts-expect-error The inclusive lower boundary belongs on DatePicker.
    const minDate: DatePickerProps = { calendar: { minDate: new Date() } };
    // @ts-expect-error The inclusive upper boundary belongs on DatePicker.
    const maxDate: DatePickerProps = { calendar: { maxDate: new Date() } };
    expect([value, defaultValue, today, minDate, maxDate]).toHaveLength(5);
  });

  it('rejects a wrapper ref where a native input ref is required', () => {
    const ref = React.createRef<HTMLDivElement>();
    // @ts-expect-error The forwarded ref targets HTMLInputElement, not the wrapper.
    const element = <DatePicker ref={ref} />;
    expect(element).toBeTruthy();
  });
});
