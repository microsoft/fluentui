'use client';

import * as React from 'react';
import { mergeCallbacks, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxProps } from '@fluentui/react-combobox';
import type { Hour, TimePickerOption } from '../../utils/types';
import {
  dateToKey,
  keyToDate,
  formatDateToTimeString as defaultFormatDateToTimeString,
  getDateStartAnchor,
  getDateEndAnchor,
  getTimesBetween,
  getDateFromTimeString,
} from '../../utils/timeMath';
import type {
  TimePickerComboboxProps,
  TimePickerCommitData,
  TimePickerOnChangeData,
  TimePickerTimeProps,
  TimePickerTimeState,
} from './TimePicker.types';

/**
 * Result of `useTimePickerSelection_unstable`.
 */
export type TimePickerSelection<TComboboxProps> = TimePickerTimeState & {
  /**
   * Props to pass to the underlying Combobox hook. The Combobox `children` must be created from `options`.
   */
  comboboxProps: TComboboxProps;

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
 * Resolves TimePicker specific props into the options, the selection state and the props for the underlying Combobox.
 *
 * It does not depend on a specific Combobox implementation and is shared by the styled and headless TimePicker.
 *
 * @param props - props from this instance of TimePicker
 */
export const useTimePickerSelection_unstable = <TComboboxProps extends TimePickerComboboxProps>(
  props: TimePickerTimeProps & Omit<TComboboxProps, 'value' | 'defaultValue' | 'onChange'>,
): TimePickerSelection<TComboboxProps> => {
  const {
    dateAnchor: dateAnchorInProps,
    defaultValue: defaultValueInProps,
    endHour = 24,
    formatDateToTimeString = defaultFormatDateToTimeString,
    hourCycle,
    increment = 30,
    onChange,
    value: valueInProps,
    showSeconds = false,
    startHour = 0,
    parseTimeStringToDate: parseTimeStringToDateInProps,
    ...restProps
  } = props;
  // Removing the TimePicker specific props leaves only the Combobox props.
  const rest = restProps as unknown as TComboboxProps;
  const { freeform = false, clearable } = rest;

  const [value, setValue] = useControllableState<Date | null>({
    state: valueInProps,
    defaultState: defaultValueInProps,
    initialState: null,
  });
  const valueKey = dateToKey(value);

  // The fallback anchor is resolved once, from the initial value, so that accepting a selection never regenerates the
  // options around the new value.
  const [initialValue] = React.useState(() => value ?? undefined);
  const { dateStartAnchor, dateEndAnchor } = useStableDateAnchor(dateAnchorInProps ?? initialValue, startHour, endHour);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- the condition is a build-time constant
    React.useEffect(() => {
      if (endHour < startHour && !dateAnchorInProps) {
        // eslint-disable-next-line no-console
        console.error(
          'TimePicker: a range that crosses midnight (endHour < startHour) needs an explicit dateAnchor, ' +
            'otherwise a value on the following day cannot identify its range.',
        );
      }
    }, [dateAnchorInProps, endHour, startHour]);
  }

  const options: TimePickerOption[] = React.useMemo(
    () =>
      getTimesBetween(dateStartAnchor, dateEndAnchor, increment).map(time => ({
        date: time,
        key: dateToKey(time),
        text: formatDateToTimeString(time, { showSeconds, hourCycle }),
      })),
    [dateEndAnchor, dateStartAnchor, formatDateToTimeString, hourCycle, increment, showSeconds],
  );

  const [typedText, setTypedText] = React.useState<TypedText | undefined>(undefined);
  const activeTypedText =
    typedText && (typedText.valueKey === valueKey || typedText.committedValueKey === valueKey)
      ? typedText.text
      : undefined;
  const formattedValue = value ? formatDateToTimeString(value, { showSeconds, hourCycle }) : '';
  const displayValue = activeTypedText ?? formattedValue;

  const [committedText, setCommittedText] = React.useState<string | undefined>(undefined);

  const commitValue = useEventCallback((event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => {
    setValue(data.value);
    setCommittedText(data.displayValue);
    // A failed commit keeps the typed text so the user can correct it; a valid one shows the formatted value.
    setTypedText(
      data.errorType && data.displayValue !== undefined
        ? { text: data.displayValue, valueKey, committedValueKey: dateToKey(data.value) }
        : undefined,
    );
    onChange?.(event, {
      event,
      type: event.type,
      ...data,
    } as TimePickerOnChangeData);
  });

  const selectedOptions = React.useMemo(() => {
    const selectedOption = options.find(option => option.key === valueKey);
    return selectedOption ? [selectedOption.key] : [];
  }, [options, valueKey]);

  const clearIconRef = React.useRef<HTMLSpanElement>(null);
  const onOptionSelect: NonNullable<ComboboxProps['onOptionSelect']> = useEventCallback((event, data) => {
    if (
      freeform &&
      data.optionValue === undefined &&
      !(clearable && event.type === 'click' && event.currentTarget === clearIconRef.current)
    ) {
      // Combobox clears selection when input value not matching any option; but we allow this case in freeform TimePicker.
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

  // Without freeform, closing the listbox or leaving the input discards the typed text, as Combobox does.
  const onOpenChange: NonNullable<ComboboxProps['onOpenChange']> = useEventCallback((event, data) => {
    if (!data.open && !freeform) {
      setTypedText(undefined);
    }
  });
  const onInputBlur = useEventCallback(() => {
    if (!freeform) {
      setTypedText(undefined);
    }
  });

  const defaultParseTimeStringToDate = React.useCallback(
    (time: string | undefined) =>
      getDateFromTimeString(time, dateStartAnchor, dateEndAnchor, { hourCycle, showSeconds }),
    [dateEndAnchor, dateStartAnchor, hourCycle, showSeconds],
  );

  return {
    comboboxProps: {
      autoComplete: 'off',
      ...rest,
      value: displayValue,
      onChange: onInputChange,
      onBlur: mergeCallbacks(rest.onBlur, onInputBlur),
      onOpenChange: mergeCallbacks(rest.onOpenChange, onOpenChange),
      selectedOptions,
      onOptionSelect,
    } as TComboboxProps,
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
    // `providedDate`'s stable key representation is used as dependency instead of the Date object. This ensures that the memoization remains stable when a new Date object representing the same date is passed in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endHour, fallbackDateAnchor, providedDateKey, startHour]);
};
