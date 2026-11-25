'use client';

import * as React from 'react';
import { mergeCallbacks, slot, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxProps } from '../Combobox/Combobox.types';
import type { TimePickerErrorType, TimePickerOption } from './utils/types';
import {
  createTimeFormat,
  dateToKey,
  keyToDate,
  getDateStartAnchor,
  getDateEndAnchor,
  getTimesBetween,
} from './utils/timeMath';
import type {
  TimePickerCommitData,
  TimePickerOnChangeData,
  TimePickerProps,
  TimePickerTimeState,
} from './TimePicker.types';

/**
 * Result of `useTimePickerSelection`.
 */
export type TimePickerSelection = TimePickerTimeState & {
  /**
   * Props to pass to the underlying Combobox hook. The Combobox `children` must be created from `options`.
   */
  comboboxProps: ComboboxProps;

  /**
   * Options rendered in the listbox: the options that start with the typed text, or all options when nothing is typed.
   */
  options: TimePickerOption[];

  /**
   * Ref to be merged into the Combobox `clearIcon` slot. It tells clearing apart from a freeform commit.
   */
  clearIconRef: React.RefObject<HTMLSpanElement | null>;

  /**
   * Commits a value: updates `value` and the display text and invokes `onChange`.
   * A commit with an `errorType` keeps `value` and the typed text, and reports the error through `onChange`.
   * An empty commit with an `errorType` (`required-input`) clears `value`.
   */
  commitValue: (event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => void;

  /**
   * Records the typed text. Merged into the resolved input slot, so an `onChange` on the input slot does not replace it.
   */
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Replaces the typed text with the committed value and clears the error, reporting the cleared error through
   * `onChange`. Returns whether there was anything to restore.
   */
  restoreCommittedText: (event: React.KeyboardEvent<HTMLElement>) => boolean;

  /**
   * Resets typing state when the listbox closes: filtering, and in non-freeform mode the typed text.
   */
  onListboxClose: () => void;

  /**
   * Whether an option text starts with the given text, ignoring case, bidi marks and the locale's digits.
   */
  matchesText: (optionText: string, text: string) => boolean;

  /**
   * Keeps the listbox from activating an option by itself until the user types or the listbox closes.
   */
  setSuppressAutoActivate: (suppress: boolean) => void;
};

type SearchableOption = TimePickerOption & {
  /** Option text normalized for matching typed text. */
  searchText: string;
};

/**
 * Text kept by the last failed commit, and the error it reported.
 */
type FailedCommit = {
  text: string;
  errorType: TimePickerErrorType;
};

/**
 * Resolves TimePicker specific props into the options, the selection state and the props for the underlying Combobox.
 *
 * @param props - props from this instance of TimePicker
 */
export const useTimePickerSelection = (props: TimePickerProps): TimePickerSelection => {
  const {
    dateAnchor: dateAnchorInProps,
    defaultValue: defaultValueInProps,
    endHour = 24,
    formatDateToTimeString: formatDateToTimeStringInProps,
    hourCycle,
    increment = 30,
    locale,
    onChange,
    value: valueInProps,
    showSeconds = false,
    startHour = 0,
    parseTimeStringToDate: parseTimeStringToDateInProps,
    ...rest
  } = props;
  const { freeform = true, clearable } = rest;

  const [value, setValue] = useControllableState<Date | null>({
    state: valueInProps,
    defaultState: defaultValueInProps,
    initialState: null,
  });
  const valueKey = dateToKey(value);
  const validValue = value && valueKey !== 'invalid' ? value : undefined;

  const [typedText, setTypedText] = React.useState<string | undefined>(undefined);
  const [failedCommit, setFailedCommit] = React.useState<FailedCommit | undefined>(undefined);
  const [previousValueKey, setPreviousValueKey] = React.useState(valueKey);
  const valueChanged = previousValueKey !== valueKey;
  if (valueChanged) {
    setPreviousValueKey(valueKey);
    setTypedText(undefined);
    setFailedCommit(undefined);
  }

  const [suppressAutoActivate, setSuppressAutoActivate] = React.useState(false);
  // Typing filters the options until the listbox closes. Reopening it shows all options, so a failed commit can be
  // corrected by picking an option.
  const [isFiltering, setIsFiltering] = React.useState(false);

  // Without `dateAnchor`, the options follow the day of the last valid value. A range that crosses midnight keeps the
  // initial value, because a value after midnight cannot tell which day its range starts on.
  const [valueAnchor, setValueAnchor] = React.useState(validValue);
  if (validValue && endHour >= startHour && valueKey !== dateToKey(valueAnchor ?? null)) {
    setValueAnchor(validValue);
  }
  const { dateStartAnchor, dateEndAnchor } = useStableDateAnchor(dateAnchorInProps ?? valueAnchor, startHour, endHour);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && endHour < startHour && !dateAnchorInProps) {
      // eslint-disable-next-line no-console
      console.error(
        'TimePicker: a range that crosses midnight (endHour < startHour) needs an explicit dateAnchor, ' +
          'otherwise a value on the following day cannot identify its range.',
      );
    }
  }, [dateAnchorInProps, endHour, startHour]);

  const timeFormat = React.useMemo(
    () => createTimeFormat({ hourCycle, locale, showSeconds }),
    [hourCycle, locale, showSeconds],
  );
  const formatTime = React.useCallback(
    (date: Date) =>
      formatDateToTimeStringInProps
        ? formatDateToTimeStringInProps(date, { hourCycle, locale, showSeconds })
        : timeFormat.format(date),
    [formatDateToTimeStringInProps, hourCycle, locale, showSeconds, timeFormat],
  );

  const toSearchText = React.useCallback(
    (text: string) => timeFormat.normalize(text).trim().toLowerCase(),
    [timeFormat],
  );
  const matchesText = React.useCallback(
    (optionText: string, text: string) => toSearchText(optionText).startsWith(toSearchText(text)),
    [toSearchText],
  );

  const allOptions: SearchableOption[] = React.useMemo(
    () =>
      getTimesBetween(dateStartAnchor, dateEndAnchor, increment).map(time => {
        const text = formatTime(time);
        return { date: time, key: dateToKey(time), text, searchText: toSearchText(text) };
      }),
    [dateEndAnchor, dateStartAnchor, formatTime, increment, toSearchText],
  );

  // With nothing typed (or only whitespace), all options are shown.
  const filterText = isFiltering && typedText?.trim() ? toSearchText(typedText) : undefined;
  const options = React.useMemo(
    () =>
      filterText === undefined ? allOptions : allOptions.filter(option => option.searchText.startsWith(filterText)),
    [allOptions, filterText],
  );

  const formattedValue = React.useMemo(
    () => (validValue ? formatTime(validValue) : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `valueKey` stands for `value`
    [formatTime, valueKey],
  );
  const displayValue = typedText ?? formattedValue;
  const committedText = failedCommit?.text ?? formattedValue;
  const errorType = failedCommit?.errorType;

  const reportChange = (event: TimePickerOnChangeData['event'], data: TimePickerCommitData) =>
    onChange?.(event, { event, type: event.type, ...data } as TimePickerOnChangeData);

  const commitValue = useEventCallback((event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => {
    if (data.errorType) {
      // A failed commit keeps `value` and the typed text, so the text can be corrected.
      // Emptying the input is deliberate, so it still clears the value and reports the error.
      const text = data.displayValue ?? displayValue;
      const nextValue = text.trim() ? value : null;
      if (nextValue !== value) {
        setValue(nextValue);
      }
      setTypedText(text);
      setFailedCommit({ text, errorType: data.errorType });
      reportChange(event, { value: nextValue, displayValue: text, errorType: data.errorType });
      return;
    }

    const nextValueKey = dateToKey(data.value);
    const nextDisplayValue =
      data.displayValue === undefined
        ? data.displayValue
        : data.value && nextValueKey !== 'invalid'
        ? formatTime(data.value)
        : '';

    setValue(data.value);
    setTypedText(undefined);
    setFailedCommit(undefined);
    reportChange(event, { ...data, displayValue: nextDisplayValue });
  });

  const restoreCommittedText = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const hasPendingText = typedText !== undefined && typedText !== formattedValue;
    if (!hasPendingText && !errorType) {
      return false;
    }

    setTypedText(undefined);
    setFailedCommit(undefined);
    if (errorType) {
      reportChange(event, { value, displayValue: formattedValue, errorType: undefined });
    }
    return true;
  });

  // The key is kept even when no option matches, so a value between options still shows the clear icon.
  const selectedOptions = React.useMemo(() => (value && valueKey !== 'invalid' ? [valueKey] : []), [value, valueKey]);

  const clearIconRef = React.useRef<HTMLSpanElement>(null);
  const onOptionSelect: NonNullable<ComboboxProps['onOptionSelect']> = useEventCallback((event, data) => {
    const isClear =
      clearable && (event.type === 'click' || event.type === 'keydown') && event.currentTarget === clearIconRef.current;
    if (data.optionValue === undefined && !isClear) {
      return;
    }
    if (data.optionValue === valueKey && typedText === undefined && !errorType) {
      return;
    }

    commitValue(event, {
      value: keyToDate(data.optionValue ?? ''),
      displayValue: data.optionText,
      errorType: undefined,
    });
  });

  const onInputChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedText(event.target.value);
    setIsFiltering(true);
    setSuppressAutoActivate(false);
  });

  const discardTypedText = useEventCallback(() => {
    if (!freeform) {
      setTypedText(undefined);
    }
  });
  // Called whenever the listbox is closed, including by a controlled `open` prop.
  const onListboxClose = useEventCallback(() => {
    discardTypedText();
    setIsFiltering(false);
    setSuppressAutoActivate(false);
  });

  const defaultParseTimeStringToDate = React.useCallback(
    (time: string | undefined) => timeFormat.parse(time, dateStartAnchor, dateEndAnchor),
    [dateEndAnchor, dateStartAnchor, timeFormat],
  );

  // Freeform text that no option starts with, or typed text that was deleted, keeps the Combobox from activating the
  // first option, so Enter or Tab cannot replace the text with an unrelated time. Arrow keys still activate options.
  // While filtering, `options` already holds the options that match the typed text.
  const matchesNoOption =
    freeform &&
    (!displayValue.trim()
      ? typedText !== undefined
      : filterText !== undefined
      ? options.length === 0
      : !allOptions.some(option => option.searchText.startsWith(toSearchText(displayValue))));

  const comboboxProps: ComboboxProps = {
    autoComplete: 'off',
    ...rest,
    freeform,
    // The Clear button is a real button: focusable, named, and exposed to assistive technology.
    clearIcon:
      rest.clearIcon === null
        ? null
        : {
            role: 'button',
            tabIndex: 0,
            'aria-label': 'Clear',
            'aria-hidden': undefined,
            ...slot.resolveShorthand(rest.clearIcon),
          },
    disableAutoFocus: matchesNoOption || suppressAutoActivate,
    value: displayValue,
    onBlur: mergeCallbacks(rest.onBlur, discardTypedText),
    selectedOptions,
    onOptionSelect,
  };

  return {
    comboboxProps,
    options,
    clearIconRef,
    commitValue,
    onInputChange,
    restoreCommittedText,
    onListboxClose,
    matchesText,
    setSuppressAutoActivate,
    freeform,
    parseTimeStringToDate: parseTimeStringToDateInProps ?? defaultParseTimeStringToDate,
    committedText,
    errorType,
    optionCount: options.length,
  };
};

/**
 * Provides stable start and end date anchors based on the provided date and time parameters.
 * The hook ensures that the memoization remains consistent even if new Date objects representing the same date are provided.
 */
const useStableDateAnchor = (providedDate: Date | undefined, startHour: number, endHour: number) => {
  const [fallbackDateAnchor] = React.useState(() => new Date());

  // Only the day matters, so a new time on the same day keeps the options.
  const providedDateKey = providedDate ? getDateStartAnchor(providedDate, startHour).getTime() : undefined;

  return React.useMemo(() => {
    const dateAnchor = providedDate ?? fallbackDateAnchor;

    const dateStartAnchor = getDateStartAnchor(dateAnchor, startHour);
    const dateEndAnchor = getDateEndAnchor(dateAnchor, startHour, endHour);

    return { dateStartAnchor, dateEndAnchor };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endHour, fallbackDateAnchor, providedDateKey, startHour]);
};
