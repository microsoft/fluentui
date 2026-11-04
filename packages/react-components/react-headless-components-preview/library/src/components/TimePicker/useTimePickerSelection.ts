'use client';

import * as React from 'react';
import { mergeCallbacks, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxProps } from '../Combobox/Combobox.types';
import type { Hour, TimePickerOption } from './utils/types';
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
   * Options rendered in the listbox.
   */
  options: TimePickerOption[];

  /**
   * Ref to be merged into the Combobox `clearIcon` slot. It tells clearing apart from a freeform commit.
   */
  clearIconRef: React.RefObject<HTMLSpanElement | null>;

  /**
   * Updates `value` and the display text, then invokes `onChange`.
   */
  commitValue: (event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => void;
};

/**
 * Text typed by the user, with the value keys it belongs to.
 * The text is kept while `value` is either the value it was typed over or the value its commit produced,
 * and discarded when `value` changes to anything else (for example a new controlled value).
 */
type TypedText = {
  text: string | undefined;
  valueKey: string;
  committedValueKey: string;
};

/**
 * Display text of the last change, with the value keys it belongs to: the value it was made over and the value it
 * produced. Both are kept so a change the controlled parent did not accept is not reported again.
 */
type LastCommit = {
  text: string;
  valueKey: string;
  committedValueKey: string;
};

const belongsTo = (text: { valueKey: string; committedValueKey: string }, valueKey: string) =>
  text.valueKey === valueKey || text.committedValueKey === valueKey;

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
    onChange,
    value: valueInProps,
    showSeconds = false,
    startHour = 0,
    parseTimeStringToDate: parseTimeStringToDateInProps,
    ...rest
  } = props;
  const { freeform = false, clearable } = rest;

  const [value, setValue] = useControllableState<Date | null>({
    state: valueInProps,
    defaultState: defaultValueInProps,
    initialState: null,
  });
  const valueKey = dateToKey(value);

  const [initialValue] = React.useState(() => value ?? undefined);
  const { dateStartAnchor, dateEndAnchor } = useStableDateAnchor(dateAnchorInProps ?? initialValue, startHour, endHour);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && endHour < startHour && !dateAnchorInProps) {
      // eslint-disable-next-line no-console
      console.error(
        'TimePicker: a range that crosses midnight (endHour < startHour) needs an explicit dateAnchor, ' +
          'otherwise a value on the following day cannot identify its range.',
      );
    }
  }, [dateAnchorInProps, endHour, startHour]);

  const timeFormat = React.useMemo(() => createTimeFormat({ hourCycle, showSeconds }), [hourCycle, showSeconds]);
  const formatTime = React.useCallback(
    (date: Date) =>
      formatDateToTimeStringInProps
        ? formatDateToTimeStringInProps(date, { showSeconds, hourCycle })
        : timeFormat.format(date),
    [formatDateToTimeStringInProps, hourCycle, showSeconds, timeFormat],
  );

  const options: TimePickerOption[] = React.useMemo(
    () =>
      getTimesBetween(dateStartAnchor, dateEndAnchor, increment).map(time => ({
        date: time,
        key: dateToKey(time),
        text: formatTime(time),
      })),
    [dateEndAnchor, dateStartAnchor, formatTime, increment],
  );

  const [typedText, setTypedText] = React.useState<TypedText | undefined>(undefined);
  const [lastCommit, setLastCommit] = React.useState<LastCommit | undefined>(undefined);

  // Discard typed and committed text that belongs to neither the previous nor the current value,
  // so it does not come back when the value later changes back.
  const [previousValueKey, setPreviousValueKey] = React.useState(valueKey);
  if (previousValueKey !== valueKey) {
    setPreviousValueKey(valueKey);
    if (typedText && !belongsTo(typedText, valueKey)) {
      setTypedText(undefined);
    }
    if (lastCommit && !belongsTo(lastCommit, valueKey)) {
      setLastCommit(undefined);
    }
  }

  const activeTypedText = typedText && belongsTo(typedText, valueKey) ? typedText.text : undefined;
  const formattedValue = React.useMemo(
    () => (value ? formatTime(value) : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `valueKey` stands for `value`
    [formatTime, valueKey],
  );
  const displayValue = activeTypedText ?? formattedValue;

  const committedText = lastCommit && belongsTo(lastCommit, valueKey) ? lastCommit.text : formattedValue;

  const commitValue = useEventCallback((event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => {
    const keepsTypedText = !!data.errorType && data.displayValue !== undefined;
    const nextDisplayValue =
      keepsTypedText || data.displayValue === undefined ? data.displayValue : data.value ? formatTime(data.value) : '';
    const nextValueKey = dateToKey(data.value);

    setValue(data.value);
    setLastCommit({ text: nextDisplayValue ?? '', valueKey, committedValueKey: nextValueKey });
    setTypedText(keepsTypedText ? { text: data.displayValue!, valueKey, committedValueKey: nextValueKey } : undefined);
    onChange?.(event, {
      event,
      type: event.type,
      ...data,
      displayValue: nextDisplayValue,
    } as TimePickerOnChangeData);
  });

  // The key is kept even when no option matches, so a value between options still shows the clear icon.
  const selectedOptions = React.useMemo(() => (value && valueKey !== 'invalid' ? [valueKey] : []), [value, valueKey]);

  const clearIconRef = React.useRef<HTMLSpanElement>(null);
  const onOptionSelect: NonNullable<ComboboxProps['onOptionSelect']> = useEventCallback((event, data) => {
    if (
      data.optionValue === undefined &&
      !(clearable && event.type === 'click' && event.currentTarget === clearIconRef.current)
    ) {
      return;
    }
    if (data.optionValue === valueKey && activeTypedText === undefined) {
      return;
    }

    commitValue(event, {
      value: keyToDate(data.optionValue ?? ''),
      displayValue: data.optionText,
      errorType: undefined,
    });
  });

  const onInputChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedText({ text: event.target.value, valueKey, committedValueKey: valueKey });
  });

  const discardTypedText = useEventCallback(() => {
    if (!freeform) {
      setTypedText(undefined);
    }
  });
  const onOpenChange: NonNullable<ComboboxProps['onOpenChange']> = useEventCallback((event, data) => {
    if (!data.open) {
      discardTypedText();
    }
  });

  const defaultParseTimeStringToDate = React.useCallback(
    (time: string | undefined) => timeFormat.parse(time, dateStartAnchor, dateEndAnchor),
    [dateEndAnchor, dateStartAnchor, timeFormat],
  );

  // Freeform text that no option starts with keeps the Combobox from activating the first option, so Enter or Tab
  // cannot replace the text with an unrelated time. Arrow keys still activate options.
  const searchText = displayValue.trim().toLowerCase();
  const matchesNoOption =
    freeform && !!searchText && !options.some(option => option.text.toLowerCase().indexOf(searchText) === 0);

  const comboboxProps: ComboboxProps = {
    autoComplete: 'off',
    ...rest,
    disableAutoFocus: matchesNoOption,
    value: displayValue,
    onChange: onInputChange,
    onBlur: mergeCallbacks(rest.onBlur, discardTypedText),
    onOpenChange: mergeCallbacks(rest.onOpenChange, onOpenChange),
    selectedOptions,
    onOptionSelect,
  };

  return {
    comboboxProps,
    options,
    clearIconRef,
    commitValue,
    freeform,
    parseTimeStringToDate: parseTimeStringToDateInProps ?? defaultParseTimeStringToDate,
    committedText,
  };
};

/**
 * Provides stable start and end date anchors based on the provided date and time parameters.
 * The hook ensures that the memoization remains consistent even if new Date objects representing the same date are provided.
 */
const useStableDateAnchor = (providedDate: Date | undefined, startHour: Hour, endHour: Hour) => {
  const [fallbackDateAnchor] = React.useState(() => new Date());

  const providedDateKey = dateToKey(providedDate ?? null);

  return React.useMemo(() => {
    const dateAnchor = providedDate ?? fallbackDateAnchor;

    const dateStartAnchor = getDateStartAnchor(dateAnchor, startHour);
    const dateEndAnchor = getDateEndAnchor(dateAnchor, startHour, endHour);

    return { dateStartAnchor, dateEndAnchor };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endHour, fallbackDateAnchor, providedDateKey, startHour]);
};
