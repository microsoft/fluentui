'use client';

import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { EventData, EventHandler } from '@fluentui/react-utilities';

type DatePickerEvent = React.SyntheticEvent | Event;

export type DatePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';

export type DatePickerDateChangeData = EventData<string, DatePickerEvent> & {
  value: Date | null;
  selectedDateRange: Date[];
  reason: 'calendar' | 'input' | 'clear';
};

export type DatePickerValidationResultData = EventData<string, DatePickerEvent> & {
  error?: DatePickerErrorType;
};

/** Date-input state shared by the styled and headless component integrations. */
export type DatePickerDateStateOptions = {
  value?: Date | null;
  defaultValue?: Date | null;
  allowTextInput?: boolean;
  disabled?: boolean;
  required?: boolean;
  formatDate?: (date: Date) => string;
  parseDate?: (text: string) => Date | null;
  /** The Calendar integration supplies its availability check, including boundaries and restrictions. */
  isDateUnavailable?: (date: Date) => boolean;
  onDateChange?: EventHandler<DatePickerDateChangeData>;
  onValidationResult?: EventHandler<DatePickerValidationResultData>;
};

export type DatePickerDateState = {
  value: Date | null;
  text: string;
  setText: (text: string) => void;
  validate: (event: DatePickerEvent) => void;
  selectDate: (event: DatePickerEvent, date: Date, selectedDateRange: Date[]) => void;
};

const defaultFormatDate = (date: Date): string => date.toDateString();

const defaultParseDate = (text: string): Date | null => {
  const timestamp = Date.parse(text);
  return Number.isFinite(timestamp) ? new Date(timestamp) : null;
};

const isValidDate = (date: Date): boolean => Number.isFinite(date.getTime());

/**
 * Owns committed selection and editable text without depending on Input or Calendar.
 * Callers validate once per logical action, rather than separately for its blur and dismissal events.
 */
export const useDatePickerDateState = (options: DatePickerDateStateOptions): DatePickerDateState => {
  const {
    allowTextInput = false,
    disabled = false,
    required = false,
    formatDate = defaultFormatDate,
    parseDate = defaultParseDate,
    isDateUnavailable,
    onDateChange,
    onValidationResult,
  } = options;
  const [value, setValue] = useControllableState<Date | null>({
    state: options.value,
    defaultState: options.defaultValue,
    initialState: null,
  });
  const formatValue = (date: Date | null): string => (date && isValidDate(date) ? formatDate(date) : '');
  const timestamp = value?.getTime();
  const formattedValue = React.useMemo(
    () => (value && isValidDate(value) ? formatDate(value) : ''),
    [formatDate, value],
  );
  const [draft, setDraft] = React.useState(() => ({
    text: formattedValue,
    dirty: false,
    timestamp,
    formattedValue,
  }));

  if (!Object.is(draft.timestamp, timestamp) || draft.formattedValue !== formattedValue) {
    setDraft({ text: formattedValue, dirty: false, timestamp, formattedValue });
  }

  const updateText = (text: string, dirty: boolean) => setDraft({ text, dirty, timestamp, formattedValue });

  const reportValidation = (event: DatePickerEvent, error?: DatePickerErrorType) => {
    onValidationResult?.(event, { type: event.type, event, error });
  };

  const commit = (
    event: DatePickerEvent,
    date: Date | null,
    selectedDateRange: Date[],
    reason: DatePickerDateChangeData['reason'],
  ) => {
    setValue(date);
    updateText(formatValue(options.value !== undefined ? value : date), false);
    onDateChange?.(event, { type: event.type, event, value: date, selectedDateRange, reason });
  };

  const validate = useEventCallback((event: DatePickerEvent) => {
    if (disabled) {
      return;
    }

    if (!allowTextInput || (!draft.dirty && draft.text === formatValue(value))) {
      let error: DatePickerErrorType | undefined;
      if (value) {
        if (!isValidDate(value)) {
          error = 'invalid-input';
        } else if (isDateUnavailable?.(value)) {
          error = 'out-of-bounds';
        }
      } else if (required) {
        error = 'required-input';
      }
      reportValidation(event, error);
      return;
    }

    if (!draft.text) {
      if (draft.dirty || value !== null) {
        commit(event, null, [], 'clear');
      }
      reportValidation(event, required ? 'required-input' : undefined);
      return;
    }

    // A custom formatter can produce text which its parser cannot round-trip.
    if (value && isValidDate(value) && draft.text === formatDate(value)) {
      updateText(draft.text, false);
      reportValidation(event, isDateUnavailable?.(value) ? 'out-of-bounds' : undefined);
      return;
    }

    const parsedDate = parseDate(draft.text);
    if (!parsedDate || !isValidDate(parsedDate)) {
      updateText(formatValue(value), false);
      reportValidation(event, 'invalid-input');
      return;
    }
    if (isDateUnavailable?.(parsedDate)) {
      reportValidation(event, 'out-of-bounds');
      return;
    }

    commit(event, parsedDate, [parsedDate], 'input');
    reportValidation(event);
  });

  const selectDate = useEventCallback((event: DatePickerEvent, date: Date, selectedDateRange: Date[]) => {
    if (disabled) {
      return;
    }
    if (!isValidDate(date)) {
      reportValidation(event, 'invalid-input');
      return;
    }
    if (isDateUnavailable?.(date)) {
      reportValidation(event, 'out-of-bounds');
      return;
    }
    commit(event, date, selectedDateRange, 'calendar');
    reportValidation(event);
  });

  const setText = useEventCallback((text: string) => {
    if (allowTextInput && !disabled) {
      updateText(text, true);
    }
  });

  return { value, text: draft.text, setText, validate, selectDate };
};
