'use client';

import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
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
  TimePickerSelectedTimeChangeData,
  TimePickerSelectedTimeChangeEvent,
  TimePickerTimeProps,
  TimePickerTimeState,
} from './TimePicker.types';

/**
 * Selection of a time, without the event data.
 */
export type TimePickerSelectTimeData = Pick<
  TimePickerSelectedTimeChangeData,
  'selectedTime' | 'selectedTimeText' | 'errorType'
>;

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
   * Ref to be merged into the Combobox `clearIcon` slot.
   */
  clearIconRef: React.RefObject<HTMLSpanElement | null>;

  /**
   * Updates the selected time and invokes `onSelectedTimeChange`.
   */
  selectTime: (event: TimePickerSelectedTimeChangeEvent, data: TimePickerSelectTimeData) => void;
};

/**
 * Resolves TimePicker specific props into the options, the selection state and the props for the underlying Combobox.
 *
 * It does not depend on a specific Combobox implementation and is shared by the styled and headless TimePicker.
 *
 * @param props - props from this instance of TimePicker
 */
export const useTimePickerSelection_unstable = <TComboboxProps extends Pick<ComboboxProps, 'clearable' | 'freeform'>>(
  props: TimePickerTimeProps & TComboboxProps,
): TimePickerSelection<TComboboxProps> => {
  const {
    dateAnchor: dateAnchorInProps,
    defaultSelectedTime: defaultSelectedTimeInProps,
    endHour = 24,
    formatDateToTimeString = defaultFormatDateToTimeString,
    hourCycle,
    increment = 30,
    onSelectedTimeChange,
    selectedTime: selectedTimeInProps,
    showSeconds = false,
    startHour = 0,
    parseTimeStringToDate: parseTimeStringToDateInProps,
    ...restProps
  } = props;
  // Removing the TimePicker specific props leaves only the Combobox props.
  const rest = restProps as unknown as TComboboxProps;
  const { freeform = false, clearable } = rest;

  const { dateStartAnchor, dateEndAnchor } = useStableDateAnchor(
    dateAnchorInProps ?? selectedTimeInProps ?? defaultSelectedTimeInProps ?? undefined,
    startHour,
    endHour,
  );

  const options: TimePickerOption[] = React.useMemo(
    () =>
      getTimesBetween(dateStartAnchor, dateEndAnchor, increment).map(time => ({
        date: time,
        key: dateToKey(time),
        text: formatDateToTimeString(time, { showSeconds, hourCycle }),
      })),
    [dateEndAnchor, dateStartAnchor, formatDateToTimeString, hourCycle, increment, showSeconds],
  );

  const [selectedTime, setSelectedTime] = useControllableState<Date | null>({
    state: selectedTimeInProps,
    defaultState: defaultSelectedTimeInProps,
    initialState: null,
  });

  const [submittedText, setSubmittedText] = React.useState<string | undefined>(undefined);

  const selectTime = useEventCallback((event: TimePickerSelectedTimeChangeEvent, data: TimePickerSelectTimeData) => {
    setSelectedTime(data.selectedTime);
    setSubmittedText(data.selectedTimeText);
    onSelectedTimeChange?.(event, {
      event,
      type: event.type as TimePickerSelectedTimeChangeData['type'],
      ...data,
    } as TimePickerSelectedTimeChangeData);
  });

  const selectedOptions = React.useMemo(() => {
    const selectedTimeKey = dateToKey(selectedTime);
    const selectedOption = options.find(option => option.key === selectedTimeKey);
    return selectedOption ? [selectedOption.key] : [];
  }, [options, selectedTime]);

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

    selectTime(event, {
      selectedTime: keyToDate(data.optionValue ?? ''),
      selectedTimeText: data.optionText,
      errorType: undefined,
    });
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
      selectedOptions,
      onOptionSelect,
    } as TComboboxProps,
    options,
    clearIconRef,
    selectTime,
    freeform,
    parseTimeStringToDate: parseTimeStringToDateInProps ?? defaultParseTimeStringToDate,
    submittedText,
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
