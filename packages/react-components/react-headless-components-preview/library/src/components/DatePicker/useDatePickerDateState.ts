'use client';

import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { DatePickerDateChangeData, DatePickerErrorType, DatePickerProps } from './DatePicker.types';

type DatePickerEvent = React.SyntheticEvent | Event;

type DatePickerDateStateOptions = Pick<
  DatePickerProps,
  'value' | 'defaultValue' | 'allowTextInput' | 'disabled' | 'required' | 'onDateChange' | 'onValidationResult'
> & {
  formatDate: (date: Date) => string;
  parseDate: (text: string) => Date | null;
  isDateUnavailable: (date: Date) => boolean;
};

/**
 * Committed value, pending text and validation state of a DatePicker.
 */
export type DatePickerDateState = {
  value: Date | null;
  text: string;
  error: DatePickerErrorType | undefined;
  setText: (text: string) => void;
  validate: (event: DatePickerEvent) => void;
  selectDate: (event: DatePickerEvent, date: Date) => void;
};

const isValidDate = (date: Date | null | undefined): date is Date => !!date && Number.isFinite(date.getTime());

/**
 * Owns the committed date and editable text without depending on the field or the Calendar.
 * Pending text is validated once per change: repeated blur or outside clicks neither change nor re-report the result.
 */
export const useDatePickerDateState = (options: DatePickerDateStateOptions): DatePickerDateState => {
  const {
    allowTextInput = false,
    disabled = false,
    required = false,
    formatDate,
    parseDate,
    isDateUnavailable,
    onDateChange,
    onValidationResult,
  } = options;

  const [value, setValue] = useControllableState<Date | null>({
    state: options.value,
    defaultState: options.defaultValue,
    initialState: null,
  });
  const committedValue = isValidDate(value) ? value : null;
  const formattedValue = committedValue ? formatDate(committedValue) : '';

  const [draft, setDraft] = React.useState({
    text: formattedValue,
    dirty: false,
    formattedValue,
    sourceValue: committedValue?.getTime() ?? null,
  });
  const [error, setError] = React.useState<DatePickerErrorType | undefined>(undefined);
  // External value or formatter changes replace pending text.
  if (draft.formattedValue !== formattedValue || draft.sourceValue !== (committedValue?.getTime() ?? null)) {
    setDraft({
      text: formattedValue,
      dirty: false,
      formattedValue,
      sourceValue: committedValue?.getTime() ?? null,
    });
    setError(undefined);
  }

  const resetText = (text = formattedValue, sourceValue = committedValue?.getTime() ?? null) =>
    setDraft({ text, dirty: false, formattedValue: text, sourceValue });

  const report = (event: DatePickerEvent, nextError: DatePickerErrorType | undefined) => {
    setError(nextError);
    onValidationResult?.(event, { event, type: event.type, error: nextError });
  };

  const commit = (event: DatePickerEvent, date: Date | null, reason: DatePickerDateChangeData['reason']) => {
    setValue(date);
    resetText(date ? formatDate(date) : '', date?.getTime() ?? null);
    onDateChange?.(event, { event, type: event.type, value: date, reason });
  };

  const validate = useEventCallback((event: DatePickerEvent) => {
    if (disabled || !allowTextInput || !draft.dirty) {
      return;
    }

    const text = draft.text.trim();
    if (!text) {
      if (committedValue) {
        commit(event, null, 'clear');
      } else {
        resetText('');
      }
      report(event, required ? 'required-input' : undefined);
      return;
    }

    // A custom formatter may produce text its parser cannot round-trip.
    if (committedValue && text === formattedValue) {
      resetText();
      report(event, isDateUnavailable(committedValue) ? 'out-of-bounds' : undefined);
      return;
    }

    const parsedDate = parseDate(text);
    if (!isValidDate(parsedDate)) {
      resetText();
      report(event, 'invalid-input');
      return;
    }

    if (isDateUnavailable(parsedDate)) {
      resetText();
      report(event, 'out-of-bounds');
      return;
    }

    commit(event, parsedDate, 'input');
    report(event, undefined);
  });

  const selectDate = useEventCallback((event: DatePickerEvent, date: Date) => {
    if (disabled || !isValidDate(date) || isDateUnavailable(date)) {
      return;
    }

    commit(event, date, 'calendar');
    report(event, undefined);
  });

  const setText = useEventCallback((text: string) => {
    if (allowTextInput && !disabled) {
      setDraft({ text, dirty: true, formattedValue, sourceValue: committedValue?.getTime() ?? null });
    }
  });

  return { value: committedValue, text: draft.text, error, setText, validate, selectDate };
};
